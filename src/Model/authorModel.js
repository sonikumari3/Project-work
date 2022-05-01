const mongoose = require('mongoose')//import mongoose to create schema

const authorSchema = new mongoose.Schema({
    fname: {type:String,
        trim:true},
    lname: {type:String,
        trim:true},
    title: { type:String,
        trim:true, enum: ["Mr", "Mrs", "Miss"] },// used enum to recieve only predefinded input
    email: {type:String,
        trim:true},
    password: {type:String,
        trim:true}

}, { timestamps: true })

module.exports = mongoose.model('author', authorSchema)
// models are higher order constructors which create document with the help of schema