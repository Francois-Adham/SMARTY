const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    Body: String,
    Date: Date,
    Grade: Float32Array
});

const Quiz = mongoose.model("Quiz",QuizSchema);
module.exports = Quiz;