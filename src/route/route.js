const express = require('express')//import express
const router = express.Router();//used express to create route handlers
//import controllers and middlewares
const authorcontroller = require('../controller/authorcontroller')
const blogController = require('../controller/blogController')
const auth = require('../middleware/auth')
const authentication = require('../middleware/authentication')

const app = express()//used express to create global middleware

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})


//author API's
//create author api
router.post("/author", authorcontroller.createAuthor)
//login author api
router.post("/login", authorcontroller.loginauthor)

//blog API's
//create blog api
router.post("/blog", blogController.createBlog)

//get blog api with middleware
router.get("/getblog", authentication.authentication, blogController.getblog)

//filter blog api with middleware
router.get("/filterblog", authentication.authentication, blogController.filterblog)

//update blog api with middleware
router.put("/updateblog/:blogId", authentication.authentication, auth.authorize, blogController.updatedModel)
router.put("/updateblog", authentication.authentication, auth.authorize, blogController.Endpoint)

//publish blog api with middleware
router.put("/publishblog/:blogId", authentication.authentication, auth.authorize, blogController.publisheblog)
router.put("/publishblog", authentication.authentication, auth.authorize, blogController.Endpoint)

//delete blog api with middleware
router.delete("/deleteblog/:blogId", authentication.authentication, auth.authorize, blogController.deleteblog)
router.delete("/deleteblog", authentication.authentication, auth.authorize, blogController.Endpoint)
router.delete("/deletebyquery", authentication.authentication, auth.authorize, blogController.deletebyquery)

//export router
module.exports = router;