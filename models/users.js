const mongoose = require('mongoose');

const UQuestionSchema = new mongoose.Schema({
    summary: String,
    qid: Number,
    status: String
});

const UserSchema = new mongoose.Schema({
    userID: String, 
    displayName: String,
    type: {type: String, default: "normal"},
    exp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    gold: {type: Number, default: 0},
    bannerImg: {type: String, default: "images/others/default_banner.jpg"},
    profilePicImg: {type: String, default: "images/others/default.jpg"},
    birthday:{type: String, default: ""},
    address: {type: String, default: ""},
    gender: {type: String, default: ""},
    interest: {type: String, default: ""},
    asked: [UQuestionSchema],
    answered: [UQuestionSchema],
    accepted: [UQuestionSchema],
    checkin: Array
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
