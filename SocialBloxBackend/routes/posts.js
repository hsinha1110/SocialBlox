const router = require("express").Router();
const mongoose = require("mongoose");
const fs = require("fs/promises");
const User = require("../modals/Users");

const Post = require("../modals/Post");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// Add Post
// Add Post
router.post("/addpost", upload.single("imageUrl"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialblox/posts",
      });

      imageUrl = result.secure_url;

      // Delete local temp file
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.warn("Could not delete local file:", e.message);
      }
    }

    // Get user profilePic
    const user = await User.findById(req.body.userId).select(
      "profilePic username"
    );
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const newPost = new Post({
      ...req.body,
      imageUrl,
      profilePic: user.profilePic, // ✅ attach user's profilePic
      username: user.username, // optional: attach username
    });

    await newPost.save();

    return res.status(200).json({
      status: true,
      message: "Post added successfully!",
      data: newPost,
    });
  } catch (err) {
    console.error("Add post error:", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while adding the post.",
      error: err.message,
    });
  }
});

// Update Post
router.put("/updatepost/:id", upload.single("imageUrl"), async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body);
    console.log("REQ FILE =>", req.file);

    let imageUrl = req.body.imageUrl; // fallback to existing imageUrl if no new file

    // If new file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialblox/posts",
      });

      imageUrl = result.secure_url;

      // Delete local temp file
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.warn("Could not delete local file:", e.message);
      }
    }

    // Update post with new data
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body, imageUrl } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Post data updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      status: false,
      message: "Something went wrong while updating the post",
      error: error.message,
    });
  }
});

//  Delete Post
router.delete("/deletepost/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid post id",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found with this id",
      });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      status: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//   Get all posts
router.get("/getpost", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // ⬅️ SORT ADDED

    res.status(200).json({
      status: true,
      message: "Post fetched successfully!",
      data: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Get posts by userId
router.get("/user/:userId/posts", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });

    res.status(200).json({
      status: true,
      message: "Post fetched successfully",
      data: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Like / Unlike
router.put("/like/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Like removed successfully",
      });
    } else {
      await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Post liked successfully",
      });
    }
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
