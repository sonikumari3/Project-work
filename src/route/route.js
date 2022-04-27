const express = require('express')
const router = express.Router();
const authorcontroller = require('../controller/authorcontroller')
const blogController = require('../controller/blogController')

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

router.post("/author", authorcontroller.createAuthor)
router.post("/blog", blogController.createBlog)
router.get("/getblog",blogController.getblog)
router.get("/filterblog",blogController.filterblog)
router.put("/updateblog/:blogId", blogController.updatedModel)
router.delete("/deleteblog/:blogId", blogController.deleteblog)
router.delete("/deletebyquery", blogController.deletebyquery)
module.exports = router;