const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
    userID: String,
    password: String,
    admin: Boolean
});

const Credential = mongoose.model('Credential', CredentialSchema);

module.exports = { Credential };
