const authorModel = require('../Model/authorModel')

const createAuthor = async function (req, res) {
    try {
        const fname = req.body.fname
        const lname = req.body.lname
        const title = req.body.title
        const email = req.body.email
        const password = req.body.password
        const userEmail = await authorModel.findOne({ email: email })
        
        if (!fname) {
            return res.status(400).send({ status: false, msg: "first name required" })
        }
        if (!lname) {
            return res.status(400).send({ status: false, msg: "last name required" })
        }
        if (!title) {
            return res.status(400).send({ status: false, msg: "title name required" })
        }
        let validmail = !/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)
      
        if(validmail){
            return res.status(400).send({ status: false, msg: "email is not valid" })
        }
        //email
        if (userEmail) {
            return res.status(400).send({ msg: "user already exist" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "enter password" })
        }
        const data = req.body
        const author = await authorModel.create(data)
        res.status(201).send({ status: true, msg: author })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });

    }
}

let jwt = require('jsonwebtoken')


const loginauthor = async function (req,res){
  try {
        let username = req.body.email
        let password = req.body.password
        //check valid mail
        let validmail = !/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)
      
        if(validmail){
            return res.status(400).send({ status: false, msg: "email is not valid" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "enter password" })
        }

        
    
        let author = await authorModel.findOne({email:username, password:password})
        if(!author){
            return res.status(401).send({status:false, msg:"Invalid crediential"})
        }
    
        let token = jwt.sign({
            authorId: author._id.toString(),
            group:"40",
            Project:"Blog"
        },"group40-phase2");
        console.log(token)
        res.send({status:true,msg:token})
    
  } catch (error) {
      res.status(500).send({status:false, msg:error.message})
  }
 
}

module.exports.loginauthor = loginauthor

module.exports.createAuthor = createAuthor
