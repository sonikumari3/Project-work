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

module.exports.createBlog = createBlog 