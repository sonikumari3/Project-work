let jwt = require('jsonwebtoken')

const authorize = function (req, res, next) {
    try {
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

        let logged = decode.authorId
        console.log(logged)
        let authorId = req.headers['authorid']
        console.log(authorId)
        if (logged != authorId) {return res.send({ status: false, msg: "Author not allowed" })}
        else{next()}
    } catch (error) {
        return res.status(400).send({ status: false, msg: error.message })
    }

  
}

module.exports.authorize = authorize