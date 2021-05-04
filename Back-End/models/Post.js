const mongoose = require("mongoose");
const User = require("User.js");

const PostSchema = new mongoose.Schema({
    Body: {
        type: String,
        required: [true, 'A Post must have a body'],
    },
    Date: {
        type: String,
        required: [true, 'A post must have a date'],
    },
    Type: {
        type: String,
        required: [true, 'A post must have a type'],
        default : "Announcement",
        enum :["Announcement","Assignment"]
    },
    publisher:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    MaterialPath: String
});

const Post = mongoose.model("Post",PostSchema);
module.exports = Post;