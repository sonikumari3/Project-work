let jwt = require('jsonwebtoken')

const authorize = function (req, res, next) {
    try {
        //reading token from headers
        let token = req.headers["x-Api-Key"];
        //check lowercase for token
        if (!token) token = req.headers["x-api-key"]

        //If token not found
        if (!token) {
            return res.status(404).send({ status: false, msg: "Token must be present" })
        }

        //if token found then decode token using secret key
        let decode = jwt.verify(token, "group40-phase2");
        console.log(decode)

        //if token is not valid
        if (!decode) {
            return res.status(403).send({ status: false, msg: "Invalid Token" })
        }

        //Reading authorId from decoded token
        let logged = decode.authorId
        //Reading authorId from headers
        let authorId = req.headers['authorid']

        //if logged in author and author who is making changes are not same. then authorization failed
        if (logged != authorId) {
            return res.send({ status: false, msg: "Author not allowed" })
        }
        
        //if logged in and author making changes are same then auth. successful and move next function 
        next()

    } catch (error) {
        return res.status(400).send({ status: false, msg: error.message })
    }

  
}

//export function
module.exports.authorize = authorize