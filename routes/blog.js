const express = require('express');
const { getAllBlogs,addBlog,updateBlog,getbyId,deleteBlog} = require('../controllers/blog-controllers');    
const blogrouter = express.Router();

blogrouter.get('/',getAllBlogs)
blogrouter.post('/add',addBlog)
blogrouter.put('/update/:id',updateBlog)
blogrouter.get('/:id',getbyId)
blogrouter.delete('/:id',deleteBlog)


module.exports=blogrouter;
