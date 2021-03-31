const mongoose = require('mongoose');
  
const AnswerSchema = new mongoose.Schema({
    answerID: Number,
    questionID: Number,
    answerer: String,
    content: String,
    likeCount: {type: Number, default: 0},
    accepted: Boolean,
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = { Answer };