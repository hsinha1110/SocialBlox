const router = require("express").Router();
const Post = require("../modals/Post");
const mongoose = require("mongoose");
const upload = require("../middleware/upload");
const Users = require("../modals/Users");

// add post
router.post("/addpost", upload.single("imageUrl"), async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      newPost.imageUrl = req.file.filename;
    }
    newPost
      .save()
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "Post aded successfully !" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});
// update post
router.put("/updatepost/:id", async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body); // check if body aa rahi hai

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true } // 👈 required
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

// delete post
router.delete("/deletepost/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
      Post.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "Post deleted successfully" });
      });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Post not found with this id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post
router.get("/getpost", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        status: true,
        message: "Post fetched successfully!",
        data: posts,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get post by id
router.get("/getpost/:id", async (req, res) => {
  try {
    Post.find({ userId: req.params.id })
      .then((posts) => {
        res.status(200).json({
          status: true,
          message: "Post fetched successfully",
          data: posts,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// like
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    let isLiked = false;
    post.likes.map((item) => {
      if (item == req.body.userId) {
        isLiked = true;
      }
    });

    console.log(isLiked);
    if (isLiked) {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );

      res
        .status(200)
        .json({ status: true, message: "Like  removed successfully" });
    } else {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );
      res
        .status(200)
        .json({ status: true, message: "Post liked  successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
