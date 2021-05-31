const mongoose = require("mongoose");
const Post = require("./Post.js");
const User = require("./User.js");

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'A Comment must have a body'],
    },
    publisher:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date
      }
} , { timestamps: { createdAt: 'created_at' } });

const Comment = mongoose.model("Comment",CommentSchema);
module.exports = Comment;