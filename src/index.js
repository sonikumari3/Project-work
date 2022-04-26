const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const route = require('./route/route')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://DeepakGunpal:hdg5NWwcvf2wUDTN@deepakcluster0.hynna.mongodb.net/ProjectWork?retryWrites=true&w=majority"
  ,
  { useNewurlparser: true })
  .then(() => console.log("mongoDB Connected"))
  .catch(err => console.log(err))

app.use("/", route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})