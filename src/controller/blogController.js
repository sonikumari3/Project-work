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
      $and: [{ isDeleted: false }, { isPublished: true }],
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
    const validauthor = await authorModel.findById({ _id: id });
    if (!validauthor) {
      return res
        .status(400)
        .send({ status: false, msg: "Author does not exist" });
    }
    const validcat = await blogModel.find({ category: cat });
    if (!validcat) {
      return res
        .status(400)
        .send({ status: false, msg: "category does not exist " });
    }
    const validtag = await blogModel.find({ tags: tag });
    if (!validtag) {
      return res
        .status(400)
        .send({ status: false, msg: "tag does not exist " });
    }
    const validsubcategory = await blogModel.find({ subcategory: subcat });
    if (!validsubcategory) {
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
  // try {
  //   // validate blog   
  //   const id = req.params.blogId
  //   const blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
  //   if (!blog) {
  //     return res.status(404).send({ status: false, message: "bloger  doesnt exist" })
  //   }

  //   const data = req.body
  //   const body = req.body.body
  //   const title = req.body.title
  //   const subcategory = req.body.subcategory
  //   const published = req.body
  //   const { publishedAt, isPublished } = published



  //   if (body) {
  //     await blogModel.findOneAndUpdate({ _id: id }, { body: data.body }, { new: true })

  //   }
  //   if (title) {
  //     await blogModel.findOneAndUpdate({ _id: id }, { title: data.title }, { new: true })

  //   }
  //   if (subcategory) {
  //     await blogModel.findOneAndUpdate({ _id: id }, { $push: { subcategory: data.subcategory } }, { new: true })

  //   }

  //   if (published) {
  //     await blogModel.findOneAndUpdate({ _id: id }, { $set: { publishedAt: new Date() }, isPublished: true }, { new: true })

  //   }



  //   //res.send({msg: true,blog })

  //   const updatedBlog = await blogModel.findOneAndUpdate({ _id: id }, { $push: { tags: data.tags } }, { new: true })
  //   res.send({ msg: true, updatedBlog })


  // }
  try {

    let id = req.params.blogId

    let blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    if (!blog) {
      return res.send({ status: false, message: "bloger  doesnt exist" })
    }

    if (blog.isPublished == true) {
      return res.status(404).send({ status: false, message: "bloger  alredy published" })
    }


    if (req.body.title) {
      blog.title = req.body.title
    }

    if (req.body.body) {
      blog.body = req.body.body
    }

    if (req.body.tags) {
      let temp1 = blog.tags
      temp1.push(req.body.tags)
      blog.tags = temp1

    }
    if (req.body.subcategory) {
      let temp2 = blog.subcategory
      temp2.push(req.body.subcategory)
      blog.subcategory = temp2
    }

    blog.publishedAt = new Date()
    blog.isPublished = true                          
    blog.save()
    res.status(200).send({ status: true, msg: blog })


  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

const deleteblog = async function (req, res) {
  try {
    const id = req.params.blogId

    const blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    if (blog) {
      const deletedblog = await blogModel.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true })
      return res.status(200).send({ status: true, msg: deletedblog })
    }
    res.status(404).send({ status: false, msg: "Blog does not exist" })

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }

}

const deletebyquery = async function (req, res) {
  try {
    const queryparam = req.query
    const { category, authorId, tags, subcategory, isPublished } = queryparam
    console.log(queryparam)
    const blog = await blogModel.findOne(queryparam)
    console.log(blog)
    if(!blog){
      return res.status(404).send({ status: false, message: "bloger  doesnt exist" })
    }
    const deleted = blog.isDeleted
    console.log(deleted)
    if (deleted == true) {
      return res.status(404).send({ status: false, message: "bloger  deleted " })
    }
    const deletedblog = await blogModel.findOneAndUpdate(queryparam,
      { $set: { deletedAt: new Date() }, isDeleted: true },
      { new: true })
    res.status(200).send({ status: true, msg: deletedblog })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })

  }
}


module.exports.createBlog = createBlog;
module.exports.getblog = getblog;
module.exports.filterblog = filterblog;
module.exports.updatedModel = updatedModel
module.exports.deleteblog = deleteblog
module.exports.deletebyquery = deletebyquery
