const authorModel = require('../Model/authorModel')

const createAuthor = async function (req, res) {
    const fname = req.body.fname
    const lname = req.body.lname
    const title = req.body.title
    const email = req.body.email
    // const userEmail = await authorModel.findOne({ email: email })
    const password = req.body.password
    if (!fname) {
        return res.status(400).send({ msg: "first name required" })
    }
    if (!lname) {
        return res.status(400).send({ msg: "last name required" })
    }
    if (!title) {
        return res.status(400).send({ msg: "title name required" })
    }
    if (!email) {
        return res.status(400).send({ msg: "email is required" })
    }
    // if (userEmail === email) {
    //     return res.status(400).send({ msg: "user already exist" })
    // }
    if (!password) {
        return res.status(400).send({ msg: "enter password" })
    }
    const data = req.body
    const author = await authorModel.create(data)
    res.send({ result: author })
}

module.exports.createAuthor = createAuthor
