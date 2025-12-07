const Comment = require("../modals/Comment");

const router = require("express").Router();

//add comment
router.post("/addcomment", async (req, res) => {
  try {
    const newComment = new Comment({
      comment: req.body.comment,
      userId: req.body.userId,
      postId: req.body.postId,
      username: req.body.username,
    });
    await newComment.save();
    res
      .status(200)
      .json({ status: true, message: "comment added successfullY" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete comment
router.delete("/deletecomment/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      Comment.findOneAndDelete({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ status: true, message: "comment deleted successfully" });
        })
        .catch((err) => {
          res.status(201).json(err);
        });
    } else {
      res.status(201).json({ status: false, message: "no comment found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comment by post id
router.get("/getcomment/:id", (req, res) => {
  try {
    Comment.find({ postId: req.params.id })
      .then((comments) => {
        res.status(200).json({
          status: true,
          message: "comments fetched successfully!",
          data: comments,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all comments
router.get("/getcomments", async (req, res) => {
  try {
    await Comment.find()
      .then((comment) => {
        res.status(200).json({
          status: true,
          message: "Comments fetched successfully",
          data: comment,
        });
      })
      .catch((error) => {
        res.send(500).json(error);
      });
  } catch (error) {
    res.send(500).json(error);
  }
});
//update comment

router.put("/updatecomments/:id", async (req, res) => {
  try {
    Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "comment  updated successfully!",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
