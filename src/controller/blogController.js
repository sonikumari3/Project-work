//Import Models
const blogModel = require("../Model/blogModel");
const authorModel = require("../Model/authorModel");

//create blog function
const createBlog = async function (req, res) {
  try {
    //Reading input from req.body
    const data = req.body;

    //Reading mandotory fields
    const auth = data.authorId;
    const title = data.title;
    const body = data.body;
    const category = data.category;

    if (!title) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }
    if (!body) {
      return res.status(400).send({ status: false, msg: "Body is required" });
    }
    if (!category) {
      return res.status(400).send({ status: false, msg: "Category is required" });
    }

    //authorId validation
    const id = await authorModel.findById(auth);
    if (!id) {
      return res
        .status(400)
        .send({ status: false, msg: "Author does not exist" });
    }

    //create blog
    const blog = await blogModel.create(data);
    res.status(201).send({ status: true, msg: blog });

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

//get all published blogs which are not deleted
const getblog = async function (req, res) {
  try {
    const blog = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }], }).populate('authorId');

    //If no blog found
    if (blog.length === 0) {
      return res.status(404).send({ status: false, msg: "NOT found" });
    }

    //if blog found
    res.status(200).send({ status: true, msg: blog });

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

//filter blog using query params
const filterblog = async function (req, res) {

  try {
    //Reading input from req.query 
    const query = req.query;
    const cat = query.category;
    const subcat = query.subcategory;
    const tag = query.tags;
    const id = query.authorId;

    //filter by authorId
    if (id) {
      const validauthor = await authorModel.findById({ _id: id }).select({ _id: 1 });
      if (!validauthor)
        return res
          .status(400)
          .send({ status: false, msg: "Author does not exist" });
    }

    //filter by category
    if (cat) {
      const validcat = await blogModel.find({ category: cat });
      console.log(validcat)
      if (validcat.length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "category does not exist " });
      }
    }

    //filter by tag
    if (tag) {
      const validtag = await blogModel.find({ tags: tag });
      console.log(validtag)
      if (validtag.length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "tag does not exist " });
      }
    }

    //filter by subcategory
    if (subcat) {
      const validsubcategory = await blogModel.find({ subcategory: subcat });
      if (validsubcategory.length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "subcategory does not exist " });
      }
    }

    //Assigning values to multiple variables
    const { authorId, category, tags, subcategory } = query;
    //filter blog and populate author
    const blog = await blogModel.find(query).populate('authorId');

    //if no blog found
    if (blog.length === 0) {
      return res.status(404).send({ status: false, msg: "NOT found" });
    }

    //if blog found then respond with blog
    res.status(200).send({ status: true, msg: blog });

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

const updatedModel = async function (req, res) {
  try {

    //Reading id from path param
    let id = req.params.blogId

    //find blog with above id which are not deleted
    let blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })

    //if no blog found
    if (!blog) {
      return res.send({ status: false, message: "blog doesnt exist" })
    }

    //Updating title
    if (req.body.title) {
      blog.title = req.body.title
    }

    //updating body
    if (req.body.body) {
      blog.body = req.body.body
    }

    //adding tag using push function
    if (req.body.tags) {
      let temp1 = blog.tags
      temp1.push(req.body.tags)
      blog.tags = temp1

    }

    //adding subcategory
    if (req.body.subcategory) {
      let temp2 = blog.subcategory
      temp2.push(req.body.subcategory)
      blog.subcategory = temp2
    }

    //save changes in blog
    blog.save()
    // respond with updated blog
    res.status(200).send({ status: true, msg: blog })
  }

  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

////////////////////////////////////////////////////////////////////////////////////////////

//Publish blog which are not deleted
const publisheblog = async function (req, res) {
  try {

    //Reading id from path params
    let id = req.params.blogId

    //find blog with above id
    let blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })

    //if no blog found
    if (!blog) {
      return res.send({ status: false, message: "blog doesnt exist" })
    }

    //if already published
    if (blog.isPublished == true) {
      return res.status(404).send({ status: false, message: "blog  already published" })
    }

    //Adding current time when blog published
    blog.publishedAt = new Date(Date.now())
    blog.isPublished = true
    //save changes
    blog.save()
    res.status(200).send({ status: true, msg: blog })

  } catch (error) {
    res.status(500).send({ msg: err.message })
  }

}

////////////////////////////////////////////////////////////////////////////////////////////

//delete blog using blog id in path params
const deleteblog = async function (req, res) {
  try {
    //reading id
    const id = req.params.blogId

    //finding blog with above id
    const blog = await blogModel.findOne({ $and: [{ _id: id }, { isDeleted: false }] })

    //if No blog found 
    if (!blog) {
      res.status(404).send({ status: false, msg: "Blog does not exist" })
    }

    //if blog found 
    const deletedblog = await blogModel.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: new Date(Date.now()) } }, { new: true })
    return res.status(200).send({ status: true, msg: deletedblog })

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }

}

////////////////////////////////////////////////////////////////////////////////////////////

const deletebyquery = async function (req, res) {
  try {
    //Reading query params input
    const queryparam = req.query
    //assigning values to variables
    const { category, authorId, tags, subcategory, isPublished } = queryparam

    //find blog
    const blog = await blogModel.find(queryparam).select({ title: 1, _id: 0 })
 
    //blog not found
    if (blog.length === 0) {
      return res.status(404).send({ status: false, message: "blog does not exist" })
    }

    //Declared empty array
    let arrayOfBlogs = []
    //for loop to store all the blog's title to delete
    for (let i = 0; i < blog.length; i++) {
      let blogid = blog[i].title
      arrayOfBlogs.push(blogid)
    }

    const date = new Date(Date.now())
    //delete blog and log deletion time
    const deleteblogs = await blogModel.updateMany({ title: { $in: arrayOfBlogs } },
      { $set: { deletedAt: date, isDeleted: true } },
      { new: true })

    res.status(200).send({ status: true, msg: deleteblogs })

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })

  }
}

//Exported all function
module.exports.createBlog = createBlog;
module.exports.getblog = getblog;
module.exports.filterblog = filterblog;
module.exports.updatedModel = updatedModel
module.exports.publisheblog = publisheblog
module.exports.deleteblog = deleteblog
module.exports.deletebyquery = deletebyquery 
