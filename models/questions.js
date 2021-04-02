const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answerID: Number,
    questionID: Number,
    answerer: {
        userID: {type: String, default: ""}, 
        displayName: {type: String, default: ""},
    },
    content: String,
    likeCount: {type: Number, default: 0},
    accepted: Boolean,
});

const QuestionSchema = new mongoose.Schema({
    questionID: Number,
    summary: String,
    description: String,
    likeCount: {type: Number, default: 0},
    replyCount: {type: Number, default: 0},
    status: String,
    asker: {
        userID: {type: String, default: ""}, 
        displayName: {type: String, default: ""},
    },
    lastAnswerer: {
        userID: {type: String, default: ""}, 
        displayName: {type: String, default: ""},
    },
    reward: Number,
    levelLimit: Number,
    answer_list: [AnswerSchema]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };