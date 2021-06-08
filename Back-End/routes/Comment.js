const {
  isInstructor,
  isEnrolled,
  isOwnedPost,
  isOwnedComment,
  isLoggedIn,
} = require("../middleware");

var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Comment = require("../models/Comment"),
  User = require("../models/User"),
  Post = require("../models/Post"),
  passport = require("passport");

// Add Comment
router.post("/create", isLoggedIn, (req, res) => {
  Comment.create(
    { body: req.body.body, publisher: req.user },
    (err, comment) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: "failed to Add Comment" });
      } else {
        Post.findById(req.params.postID, (err, post) => {
          if (err) {
            console.log(err);
            res.status(400).json({ status: "failed to find post" });
          } else {
            post.comments.push(comment);
            post.save();
            res.status(200).json({ status: "success", _id: comment._id });
          }
        });
      }
    }
  );
});

//delete comment by ID

router.delete("/:commentID", isOwnedComment, (req, res) => {
  Post.findById({ _id: req.params.postID }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({ status: "failed to get post" });
    } else {
      post.comments = post.comments.filter(function (value, index, arr) {
        return value != req.params.commentID;
      });
      post.save();

      Comment.findByIdAndRemove(req.params.commentID, (err) => {
        if (err) {
          res.status(400).json({ status: "failed to delete comment" });
        } else {
          res.status(200).json({ status: "success" });
        }
      });
    }
  });
});

//Edit Comment
router.put("/:commentID", isOwnedComment, (req, res) => {
  Comment.findById(req.params.commentID, (err, comment) => {
    if (err) {
      res.status.apply(404).json({ message: "comment not found" });
    } else {
      comment.body = req.body.body;
      comment.save();
      res.status(200).json({ message: "Successful!" });
    }
  });
});

module.exports = router;
