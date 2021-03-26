const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: String, 
    displayName: String,
    type: String,
    exp: Number,
    level: Number,
    gold: Number,
    profileBanner: Number,
    profilePic: Number,
    birthday: String,
    address: String,
    gender: String,
    interest: String,
    num_answers: Number,
    num_accepted: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
