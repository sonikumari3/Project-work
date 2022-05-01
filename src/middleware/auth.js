let jwt = require('jsonwebtoken')
const blogModel = require("../Model/blogModel");

//please check below condition
//blog author id === token decrypt author id

const authorize = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-Key"];
        // //check lowercase for token
        if (!token) token = req.headers["x-api-key"]

        //If token not found
        if (!token) {
            return res.status(404).send({ status: false, msg: "Token must be present" })
        }
        //if token found then decode token using secret key
        let decode = jwt.verify(token, "group40-phase2");

        //if token is not valid
        if (!decode) {
            return res.status(403).send({ status: false, msg: "Invalid Token" })
        }
        
        //Reading authorId from decoded token
        let loggedAuthorId = decode.authorId
        
        // category, authorid, tag name, subcategory name, unpublished
        let isValid = false;
        if (req.params.blogId) {
            let auth = await blogModel.findById({ _id: req.params.blogId })
            isValid = loggedAuthorId == auth.authorId;
        }
        if(req.query) {
            const queryparam = req.query;
            const { category, authorId, tags, subcategory, isPublished } = queryparam//destructuring
            const blogs = await blogModel.find(queryparam); 
            isValid = blogs.some(blog => blog.authorId == loggedAuthorId)
            console.log("isValid", isValid)
        }

        //Reading authorId from headers
        //let authorId = req.headers['authorid']

        //if logged in author and author who is making changes are not same. then authorization failed
        if (!isValid) {
            return res.send({ status: false, msg: "Author not allowed" })
        }

        //if logged in and author making changes are same then auth. successful and move next function 
        next()

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//export function
module.exports.authorize = authorize