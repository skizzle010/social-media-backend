const { json } = require("body-parser");
const { default: mongoose } = require("mongoose");
const { findByIdAndRemove } = require("../models/blog");
const blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    res.status(400).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ status: "true", blogs: blogs });
};

exports.addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let success = false;
  const blogpp = new blog({
    title,
    description,
    image,
    user,
  });
  try {
    success = await blog.create(blogpp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
  if (success) return res.status(200).json({ blog: blogpp });
  else return res.status(500).json({ msg: "error" });
};

exports.updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogID = req.params.id;
  let blogspp;
  try {
    blogspp = await blog.findByIdAndUpdate(blogID, {
      title,
      description,
    });
    console.log(blogspp)
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "couldn't updare the blog" });
  }
  return res.status(200).json({ blogs: blogspp });
};

exports.getbyId = async (req, res) => {
  const id = req.params.id;
  let blogspp;
  try {
    blogspp = await blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ message: "No Blog" });
  }
  return res.status(200).json({ blog: blogspp });
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  let blogspp;
  try {
    blogspp = await blog.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "succesfully deleted" });
};
