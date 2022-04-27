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
  try {

    let id = req.params.blogId

    let blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    if (!blog) {
      return res.send({ status: false, message: "blog doesnt exist" })
    }

    if (blog.isPublished == true) {
      return res.status(404).send({ status: false, message: "blog  already published" })
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

    blog.publishedAt = new Date(Date.now())
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

    const blog = await blogModel.find(queryparam).select({ title: 1, _id: 0 })
    console.log(blog)
    console.log(blog[0].title)

    //blog not found
    if (!blog) {
      return res.status(404).send({ status: false, message: "blog does not exist" })
    }

    //Declared empty array
    let arrayOfBlogs = []
    //for loop to store all the blog to delete
    for (let i = 0; i < blog.length; i++) {
      let blogid = blog[i].title
      arrayOfBlogs.push(blogid)
    }
    console.log(arrayOfBlogs)


    const date = new Date(Date.now())
    const deleteblogs = await blogModel.updateMany({ title: { $in: arrayOfBlogs } },
      { $set: { deletedAt: date, isDeleted: true } },
      { new: true })
    console.log(deleteblogs)

    res.status(200).send({ status: true, msg: deleteblogs })

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
