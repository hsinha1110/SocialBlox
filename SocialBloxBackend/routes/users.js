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

// Follow a user
router.put("/follow/:id", async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.body.userId;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        status: false,
        message: "You cannot follow yourself.",
      });
    }

    // Fetch both users in parallel
    const [targetUser, currentUser] = await Promise.all([
      User.findById(targetUserId),
      User.findById(currentUserId),
    ]);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Check if the current user is already following the target user
    const isAlreadyFollowed = targetUser.followers.includes(currentUserId);

    if (isAlreadyFollowed) {
      // Unfollow
      await Promise.all([
        User.updateOne(
          { _id: targetUserId },
          { $pull: { followers: currentUserId } }
        ),
        User.updateOne(
          { _id: currentUserId },
          { $pull: { following: targetUserId } }
        ),
      ]);
      return res.status(200).json({
        status: false,
        message: "You have unfollowed the user.",
      });
    } else {
      // Follow
      await Promise.all([
        User.updateOne(
          { _id: targetUserId },
          { $push: { followers: currentUserId } }
        ),
        User.updateOne(
          { _id: currentUserId },
          { $push: { following: targetUserId } }
        ),
      ]);
      return res.status(200).json({
        status: true,
        message: "You are now following the user.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
});

// Unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.body.userId;

    // Fetch both users in parallel
    const [targetUser, currentUser] = await Promise.all([
      User.findById(targetUserId),
      User.findById(currentUserId),
    ]);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Check if the current user is already following the target user
    const isAlreadyFollowing = targetUser.followers.includes(currentUserId);

    if (!isAlreadyFollowing) {
      return res.status(200).json({
        status: false,
        message: "You are not following this user.",
      });
    }

    // Unfollow
    await Promise.all([
      User.updateOne(
        { _id: targetUserId },
        { $pull: { followers: currentUserId } }
      ),
      User.updateOne(
        { _id: currentUserId },
        { $pull: { following: targetUserId } }
      ),
    ]);

    return res.status(200).json({
      status: true,
      message: "You have unfollowed the user.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
