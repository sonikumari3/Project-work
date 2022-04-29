const mongoose = require('mongoose')//import mongoose to create schema

const authorSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    title: { type: String, enum: ["Mr", "Mrs", "Miss"] },// used enum to recieve only predefinded input
    email: String,
    password: String

}, { timestamps: true })

module.exports = mongoose.model('author', authorSchema)
// models are higher order constructors which create document with the help of schema