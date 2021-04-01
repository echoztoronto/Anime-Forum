const mongoose = require('mongoose');

const UQuestionSchema = new mongoose.Schema({
    summary: String,
    qid: Number
});

const UserSchema = new mongoose.Schema({
    userID: String, 
    displayName: String,
    type: String,
    exp: Number,
    level: Number,
    gold: Number,
    bannerImg: {type: String, default: "images/others/default_banner.jpg"},
    profilePicImg: {type: String, default: "images/others/default.jpg"},
    birthday: String,
    address: String,
    gender: String,
    interest: String,
    asked: [UQuestionSchema],
    answered: [UQuestionSchema],
    accepted: [UQuestionSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
