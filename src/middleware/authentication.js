const jwt = require('jsonwebtoken');
const authorModel = require('../Model/authorModel');

const authentication = async function (req, res, next) {
    try {

        let username = req.body.email
        let password = req.body.password

        //email validation
        let validmail = !/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(username)

        if (validmail) {
            return res.status(400).send({ status: false, msg: "email is not valid" })
        }

        //email is required
        if(!username){
            return res.status(400).send({ status: false, msg: "Enter email address" })
        }

        let token = req.headers["x-Api-Key"];
        //check lowercase
        if (!token) token = req.headers["x-api-key"]

        //token must be present
        if (!token) {
            return res.status(404).send({ status: false, msg: "Token must be present" })
        }

        let decode = jwt.verify(token, "group40-phase2");
        console.log(decode)
        if (!decode) {
            return res.status(403).send({ status: false, msg: "Invalid Token" })
        }

        const authenticAuthorId = decode.authorId
        const authenticAuthor = await authorModel.findById({ _id: authenticAuthorId })
        if (!authenticAuthor) {
            return res.status(400).send({ status: false, msg: "Author does not exist" });
        }

        if (username != authenticAuthor.email || password != authenticAuthor.password) {
            return res.status(400).send({ status: false, msg: "Authentication failed" });
        }

        next()

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });

    }
}

module.exports.authentication = authentication