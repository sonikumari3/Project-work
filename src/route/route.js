const express = require('express')//import express
const router = express.Router();//used express to create route handlers
//import controllers and middlewares
const authorcontroller = require('../controller/authorcontroller')
const blogController = require('../controller/blogController')
const auth = require('../middleware/auth')

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
router.post("/blog", auth.authentication, blogController.createBlog)

//get blog api with middleware
router.get("/getblog", auth.authentication, blogController.getblog)

//filter blog api with middleware
router.get("/filterblog", auth.authentication, blogController.filterblog)

//update blog api with middleware
router.put("/updateblog/:blogId", auth.authentication, auth.authorize, blogController.updatedModel)
router.put("/updateblog",  blogController.Endpoint)

//publish blog api with middleware
router.put("/publishblog/:blogId", auth.authentication, auth.authorize, blogController.publisheblog)
router.put("/publishblog",  blogController.Endpoint)

//delete blog api with middleware
router.delete("/deleteblog/:blogId", auth.authentication, auth.authorize, blogController.deleteblog)
router.delete("/deleteblog",  blogController.Endpoint)
router.delete("/deletebyquery", auth.authentication, auth.authorize, blogController.deletebyquery)

//export router
module.exports = router;