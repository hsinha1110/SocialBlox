const User = require("../modals/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Post = require("../modals/Post");

// update user
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() =>
        res.status(200).json({
          status: true,
          message: "user data updated successfully",
        })
      )
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      User.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "User deleted successfully" });
      });
    } else {
      res
        .status(200)
        .json({ status: false, message: "User not found with this id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get users
router.get("/get", async (req, res) => {
  try {
    await User.find()
      .then((user) => {
        res.status(200).json({
          status: true,
          message: "Users fetched successfully",
          data: user,
        });
      })
      .catch((error) => {
        res.send(500).json(error);
      });
  } catch (error) {
    res.send(500).json(error);
  }
});

// get user by id
router.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (user) {
      return res.status(200).json({
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//follow
router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (isFollowed) {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: false, message: "user unfollowed successfully" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $push: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $push: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "followed user successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//unfollow
router.put("/unfollow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (!isFollowed) {
      res
        .status(200)
        .json({ status: false, message: "you are not  following this user" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "unfollowed user successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
