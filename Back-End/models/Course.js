const mongoose = require("mongoose");
const User = require('./User.js');



const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A course must have a name'],
        },
    key: {
        type: String,
        unique: true,
        required: [true, 'A course must have a key'],
        },
    instructors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]      
});

const Course = mongoose.model("Course",CourseSchema);
module.exports = Course;