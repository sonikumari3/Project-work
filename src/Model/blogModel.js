const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:  String,
    body:  String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author"
    },
    tags: [ {type: String} ],
    category: String,
    subcategory: [ {type: String} ],
    deletedAt: {type: String, default: null},
    isDeleted: {
        type:Boolean, default: false
    },
    publishedAt: {type: String, default: null},
    isPublished: {
        type: Boolean, default: false
    },
    
}, { timestamps: true })

module.exports = mongoose.model('blogs', blogSchema)



