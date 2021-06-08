const { isInstructor, isEnrolled, isOwnedPost } = require("../middleware");

var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Course = require("../models/Course"),
  User = require("../models/User"),
  Post = require("../models/Post"),
  Comment = require("../models/Comment"),
  passport = require("passport");

// Add Post
router.post("/create", isInstructor, (req, res) => {
  Post.create(
    {
      title: req.body.title,
      body: req.body.body,
      type: req.body.type,
      publisher: req.user,
    },
    (err, post) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: "failed to Add Post" });
      } else {
        Course.findById(req.params.courseID, (err, course) => {
          if (err) {
            console.log(err);
            res.status(400).json({ status: "failed to find course" });
          } else {
            course.posts.push(post);
            course.save();
            res.status(200).json({ status: "success", post: post });
          }
        });
      }
    }
  );
});

//Get Post by ID

router.get("/:postID", (req, res) => {
  Post.findById({ _id: req.params.postID })
    .populate("publisher")
    .exec((err, post) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: "failed to get post" });
      } else {
        res.status(200).json({ status: "success", data: { Post: post } });
      }
    });
});

//delete post by ID

router.delete("/:postID", isOwnedPost, (req, res) => {
  Course.findById({ _id: req.params.courseID }, (err, course) => {
    if (err) {
      console.log(err);
      res.status(400).json({ status: "failed to get Course" });
    } else {
      course.posts = course.posts.filter(function (value, index, arr) {
        return value != req.params.postID;
      });
      course.save();

      Post.findById(req.params.postID, (err, post) => {
        if (err) {
          res.status(400).json({ status: "failed to get post" });
        } else {
          // get comments
          // loop and remove them
          post.comments.forEach((comment) => {
            Comment.findByIdAndRemove(comment, (err, com) => {
              if (err) {
                console.log(err);
                res.status(400).json({ status: "failed to delete comment" });
              } else {
              }
            });
          });
          //Remove post
          Post.findByIdAndRemove(req.params.postID, (err, post) => {
            if (err) {
              console.log(err);
              res.status(400).json({ status: "failed to delete post" });
            } else {
              res.status(200).json({ status: "success" });
            }
          });
        }
      });
    }
  });
});

//Edit Post
router.put("/:postID", isOwnedPost, (req, res) => {
  Post.findById(req.params.postID, (err, post) => {
    if (err) {
      res.status.apply(404).json({ message: "post not found" });
    } else {
      post.body = req.body.body;
      post.save();
      res.status(200).json({ message: "Successful!" });
    }
  });
});

module.exports = router;
