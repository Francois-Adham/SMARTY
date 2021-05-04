const mongoose = require("mongoose");
const Post = require("Post.js");
const User = require("User.js");

const CommentSchema = new mongoose.Schema({
    Body: {
        type: String,
        required: [true, 'A Comment must have a body'],
    },
    Date: {
        type: String,
        required: [true, 'A Comment must have a date'],
    },
    publisher:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    Post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
});

const Comment = mongoose.model("Comment",CommentSchema);
module.exports = Comment;