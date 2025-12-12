const User = require("../modals/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs/promises");
const upload = require("../middleware/upload"); // multer middleware
const cloudinary = require("../config/cloudinary");

dotenv.config();
const secretKey = process.env.SECRET_KEY;

/**
 * REGISTER user
 * Supports profilePic as file upload (multipart/form-data) or as URL in JSON
 */
// REGISTER user
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { username, emailId, password, mobile, gender, dob, address } =
      req.body;

    if (!username || !emailId || !password || !mobile || !gender) {
      return res
        .status(400)
        .json({ status: false, message: "Required fields missing" });
    }

    // Check if email is already registered
    const existingEmail = await User.findOne({ emailId });
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already registered" });
    }

    // Check if mobile is already registered
    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res
        .status(400)
        .json({ status: false, message: "Mobile number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle profilePic: file upload or URL
    let profilePicUrl = req.body.profilePic || "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialblox/users",
      });
      profilePicUrl = result.secure_url;
      await fs.unlink(req.file.path); // Remove the file from local storage
    }

    const newUser = new User({
      username,
      emailId,
      password: hashedPassword,
      mobile,
      gender,
      dob,
      address,
      profilePic: profilePicUrl,
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
});

/**
 * LOGIN user
 */
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Wrong credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: { user, accessToken },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
});

/**
 * UPDATE user
 * Supports profilePic as file upload (multipart/form-data) or as URL in JSON
 */
router.put("/update/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const { password, profilePic, ...otherFields } = req.body;

    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    // Handle profilePic upload or update
    let profilePicUrl = profilePic || "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialblox/users",
      });
      profilePicUrl = result.secure_url;
      await fs.unlink(req.file.path); // Remove the local file after upload
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...otherFields,
          password: req.body.password,
          profilePic: profilePicUrl,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
