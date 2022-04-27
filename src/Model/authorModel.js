const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    title: { type: String, enum: ["Mr", "Mrs", "Miss"] },
    email: { type: String,unique:false },
    password: String

}, { timestamps: true })

module.exports = mongoose.model('author', authorSchema)