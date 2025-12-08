const User = require("../modals/Users");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.SECRET_KEY;
// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      emailId: req.body.emailId,
      password: hashedPassword,
      mobile: req.body.mobile,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Wrong credentials" });
    }

    // Generate and sign a JWT
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      message: "User found successfully",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
