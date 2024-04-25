const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')
mongoose.connect(MONGO_URL)

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: {
        type: String
    },
    mail: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true,
        trim: true,
        uniqe: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const User = mongoose.model('User', UserSchema)

module.exports =
    User
