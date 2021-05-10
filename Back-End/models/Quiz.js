const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    body: String,
    date: Date,
    grade: Float32Array
});

const Quiz = mongoose.model("Quiz",QuizSchema);
module.exports = Quiz;