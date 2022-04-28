const express = require('express')
const router = express.Router();
const authorcontroller = require('../controller/authorcontroller')
const blogController = require('../controller/blogController')
const auth = require('../middleware/auth')
const authentication = require('../middleware/authentication')

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

router.post("/author", authorcontroller.createAuthor)

router.post("/login", authorcontroller.loginauthor)

router.post("/blog", blogController.createBlog)

router.get("/getblog", authentication.authentication, blogController.getblog)

router.get("/filterblog", authentication.authentication, blogController.filterblog)

router.put("/updateblog/:blogId", authentication.authentication, auth.authorize, blogController.updatedModel)

router.put("/publishblog/:blogId", authentication.authentication, auth.authorize, blogController.publisheblog)

router.delete("/deleteblog/:blogId", authentication.authentication, auth.authorize, blogController.deleteblog)

router.delete("/deletebyquery", authentication.authentication, auth.authorize, blogController.deletebyquery)

module.exports = router;