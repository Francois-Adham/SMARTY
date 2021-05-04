const mongoose = require("mongoose");
const User = require('./User.js');
const Student = require('./Student.js');


const CourseSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'A course must have a name'],
        },
    Key: {
        type: String,
        required: [true, 'A course must have a Phone Number'],
        },
    Instructors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    Students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]      
});

const Course = mongoose.model("Course",CourseSchema);
module.exports = Course;