const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionID: Number,
    summary: String,
    description: String,
    likeCount: {type: Number, default: 0},
    replyCount: {type: Number, default: 0},
    status: String,
    asker: String,
    lastAnswerer: String,
    reward: Number,
    levelLimit: Number,
    answer_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]      // array of answer objects
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };