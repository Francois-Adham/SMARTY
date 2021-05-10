const mongoose = require("mongoose");
const User = require("User.js");

const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'A Post must have a body'],
    },
    date: {
        type: String,
        required: [true, 'A post must have a date'],
    },
    type: {
        type: String,
        required: [true, 'A post must have a type'],
        default : "Announcement",
        enum :["Announcement","Assignment"]
    },
    publisher:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    MaterialPath: String,
    course:{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },

});

const Post = mongoose.model("Post",PostSchema);
module.exports = Post;