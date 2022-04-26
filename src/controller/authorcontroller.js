const authorModel = require('../Model/authorModel')

const createAuthor = async function (req, res){
    const data = req.body
    const author = await authorModel.create(data)
    res.send({result:author})
}

module.exports.createAuthor = createAuthor