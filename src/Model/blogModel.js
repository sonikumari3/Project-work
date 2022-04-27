const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:  String,
    body:  String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author"
    },
    tags: [ {type: String} ],
    category: String,
    subcategory: [ {type: String} ],
    deletedAt: {type: Date, default: null},
    isDeleted: {
        type:Boolean, default: false
    },
    publishedAt: {type: Date, default: null},
    isPublished: {
        type: Boolean, default: false
    },
    
}, { timestamps: true })

module.exports = mongoose.model('blogs', blogSchema)



//{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, 
//tags: {array of string}, category: {string, mandatory,
 //examples: [technology, entertainment, life style, food, fashion]}, 
 //subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, 
 //createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, 
//publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
