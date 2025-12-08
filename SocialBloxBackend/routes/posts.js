const router = require("express").Router();
const mongoose = require("mongoose");
const fs = require("fs/promises");

const Post = require("../modals/Post");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// 🔹 Add Post
router.post("/addpost", upload.single("imageUrl"), async (req, res) => {
  try {
    let imageUrl = "";

    console.log("📸 req.file =>", req.file);
    console.log("📝 req.body =>", req.body);

    // ✅ Agar file aayi hai to Cloudinary par upload karo
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialblox/posts",
      });

      console.log("☁️ Cloudinary upload result =>", result);

      imageUrl = result.secure_url;

      // OPTIONAL: local temp file delete
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.warn("Could not delete local file:", e.message);
      }
    }

    const newPost = new Post({
      ...req.body,
      imageUrl,
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

// 🔹 Update Post
router.put("/updatepost/:id", async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body);

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
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
    res.status(500).json(error);
  }
});

// 🔹 Delete Post
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

// 🔹 Get all posts
router.get("/getpost", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: true,
      message: "Post fetched successfully!",
      data: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔹 Get posts by userId (agar ye intention hai)
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

// 🔹 Like / Unlike
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
