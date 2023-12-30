const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', userSchema)