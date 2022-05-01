const mongoose = require('mongoose')//import mongoose to create schema

const blogSchema = new mongoose.Schema({
    title:  {type:String,
    trim:true},
    body:  {type:String,
        trim:true},
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author"// refered author collection
    },
    tags:  {type:Array,
        trim:true} ,
    category: {type:String,
        trim:true},
    subcategory: {type:Array,
        trim:true} ,
    deletedAt: {type: String, default: null},
    isDeleted: {
        type:Boolean, default: false
    },
    publishedAt: {type: String, default: null},
    isPublished: {
        type: Boolean, default: false
    },
    
}, { timestamps: true })

//export schema
module.exports = mongoose.model('blogs', blogSchema)



