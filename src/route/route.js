const express = require('express')
const router = express.Router();
const authorcontroller = require('../controller/authorcontroller')

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

router.post("/author", authorcontroller.createAuthor)

module.exports = router;