const blogModel = require("../Model/blogModel");
const authorModel = require("../Model/authorModel");

const createBlog = async function (req, res) {
  try {
    const data = req.body;
    const auth = data.authorId;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;
    const id = await authorModel.findById(auth);
    if (!id) {
      return res
        .status(400)
        .send({ status: false, msg: "Author does not exist" });
    }

    if (!title) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }
    if (!body) {
      return res.status(400).send({ status: false, msg: "Body is required" });
    }
    if (!category) {
      return res
        .status(400)
        .send({ status: false, msg: "Category is required" });
    }
    const savedData = await blogModel.create(data);
    res.status(201).send({ status: true, msg: savedData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const getblog = async function (req, res) {
  try {
    const blog = await blogModel.find({
      $and: [{ isDeconsted: false }, { isPublished: true }],
    });
    console.log(blog);
    if (blog.length === 0) {
      return res.status(404).send({ status: false, msg: "NOT found" });
    }
    res.status(200).send({ status: true, msg: blog });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
const filterblog = async function (req, res) {
  try {
    const cat = req.query.category;
    const subcat = req.query.subcategory;
    const tag = req.query.tags;
    const query = req.query;
    const id = query.authorId;
    const validauthor = await authorModel.findById(id);
    if (!validauthor) {
      return res
        .status(400)
        .send({ status: false, msg: "Author does not exist" });
    }
    const validcat = await blogModel.find({ category: cat });
    if (validcat != cat) {
      return res
        .status(400)
        .send({ status: false, msg: "category does not exist " });
    }
    const validtag = await blogModel.find({ tags: tag });
    if (validtag != tag) {
      return res
        .status(400)
        .send({ status: false, msg: "tag does not exist " });
    }
    const validsubcategory = await blogModel.find({ subcategory: subcat });
    if (validsubcategory != subcategory) {
      return res
        .status(400)
        .send({ status: false, msg: "subcategory does not exist " });
    }
    const { authorId, category, tags, subcategory } = query;
    const blog = await blogModel.find(query);
    console.log(blog);
    if (blog.length === 0) {
      return res.status(404).send({ status: false, msg: "NOT found" });
    }
    res.status(200).send({ status: true, msg: blog });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const updatedModel = async function (req, res) {
  try {
      const data = req.body
      let id = req.params.blogId
      let body = req.body.body
      let title = req.body.title
      let published = req.body
      let {publishedAt,isPublished} = published

  
      let blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
      if (!blog) {
          return res.send({ status: false, message: "bloger  doesnt exist" })
      }

       if(body){
         await blogModel.findOneAndUpdate({ _id: id },{body: data.body},{ new: true })
       
       }
       if(title){
        await blogModel.findOneAndUpdate({ _id: id },{title: data.title},{ new: true })
      
      }
      if(published){
        await blogModel.findOneAndUpdate({ _id: id },published,{ new: true })
      
      }
      //res.send({msg: true,blog })

      let updatedBlog = await blogModel.findOneAndUpdate({ _id: id } ,{$push:{tags:data.tags, subcategory:data.subcategory} },{ new: true })
      res.send({ msg: true, updatedBlog })
  }
  catch (err) {
      res.status(500).send({ msg: err.message })
  }
}


module.exports.createBlog = createBlog;
module.exports.getblog = getblog;
module.exports.filterblog = filterblog;
module.exports.updatedModel=updatedModel
