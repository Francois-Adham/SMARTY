const mongoose = require("mongoose");
const Course = require('./Course.js');


const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'An User must have a name'],
        },
    Phone: {
        type: String,
        required: [true, 'An User must have a Phone Number'],
        },
    Email: {
        type: String,
        required: [true, 'An User must have an Email'],
        },
    Password: {
        type: String,
        required: [true, 'An User must have a paswword'],
        },
    Type: {
        type: String,
        required: [true, 'An User must have a type'],
        default : "Student",
        enum :["Instructor","Student"]
    },
    Courses: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    }]
});

const User = mongoose.model("User",UserSchema);
module.exports = User;