const blogModel = require('../Model/blogModel')
const authorModel = require('../Model/authorModel')

let createBlog = async function(req, res) {
    try{
        let data = req.body
        let auth = data.authorId
        let id = await authorModel.findById(auth)
        if(!id){
            return res.status(400).send({msg: 'Author does not exist'})
        }
        let savedData = await blogModel.create(data)
        res.status(201).send({msg : savedData})
    }
    catch(err) {
        res.status(500).send({msg : err.message})
    }
}



let getblog = async function(req,res){
    try{
        
        let blog = await blogModel.find({$and:[{isDeleted:false},{isPublished:true}]})
        console.log(blog)
        if(blog.length===0){
            return res.status(404).send({msg:'NOT found'})
        }
        res.status(200).send({msg : blog})
    }
    catch(err) {
        res.status(500).send({msg : err.message})
    }
}
let filterblog = async function(req,res){
    try{
        // let author =req.query.authorId
        // let category = req.query.category
        // let tag= req.query.tags
        // let subcategory = req.query.subcategory
        let blog = await blogModel.find({author:authorId},{category})
        console.log(blog)
        if(blog.length===0){
            return res.status(404).send({msg:'NOT found'})
        }
        res.status(200).send({msg : blog})
    }
    catch(err) {
        res.status(500).send({msg : err.message})
    }
}
module.exports.createBlog = createBlog 
module.exports.getblog= getblog
module.exports.filterblog= filterblog