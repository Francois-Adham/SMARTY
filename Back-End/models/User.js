const mongoose = require("mongoose");
const Course   = require('./Course.js');
var passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An User must have a name'],
        },
    phone: {
        type: String,
        required: [true, 'An User must have a Phone Number'],
        },
    email: {
        type: String,
        required: [true, 'An User must have an Email'],
        },
    password: {
        type: String,
        required: [true, 'An User must have a paswword'],
        },
    type: {
        type: String,
        required: [true, 'An User must have a type'],
        default : "Student",
        enum :["Instructor","Student"]
    },
    courses: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    }]
});
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",UserSchema);

module.exports = User;