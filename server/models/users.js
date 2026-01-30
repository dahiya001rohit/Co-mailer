const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encryptedAccessToken: {
        type: String,
        required: true
    },
    accessTokenExpiry: {
        type: Number,
        required: true
    },
    encryptedRefreshToken: {
        type: String,
        required: true
    },
    refreshTokenExpiry: {
        type: Number,
        required: true
    },
})

const Users = mongoose.model('users', userSchema)
module.exports = Users