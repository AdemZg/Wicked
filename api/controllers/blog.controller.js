const Blog = require('../models/blog.model.js')
const User = require('../models/user.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')
const { cloudinaryUpload } = require("../utils/cloudinary")
const fs = require('fs')


const createBlog = asyncHandler ( async (req, res) => {
    try{
        const blog = await Blog.create(req.body)
        res.json(blog)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateBlog = asyncHandler( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const blog = await Blog.findByIdAndUpdate(id, req.body , { new: true })
        res.json(blog)
    }
    catch(err){
        throw new Error(err)
    }
})

const getBlogs = asyncHandler( async (req, res) => {
    try{
        const blogs = await Blog.find()
        res.json(blogs)
    }
    catch(err){
        throw new Error(err)
    }
})

const getBlog = asyncHandler( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const blog = await Blog.findById(id).populate('likes').populate('dislikes')
        await Blog.findByIdAndUpdate(id, { $inc:{ numViews:1 } }, { new: true})
        res.json(blog)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteBlog = asyncHandler( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await Blog.findByIdAndDelete(id)
        res.json({message : "Blog deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const likeBlog = asyncHandler( async (req, res) => {
    const { blogId } = req.body
    const loggedInUserId = req?.user?._id
    const blog = await Blog.findById(blogId)
    //find if the user has liked the blog
    const isLiked = blog?.isLiked
    //find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loggedInUserId.toString())
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, { $pull:{ dislikes: loggedInUserId }, isDisliked: false }, { new: true })
        return res.json(blog)
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, { $pull:{ likes: loggedInUserId }, isLiked: false }, { new: true })
        res.json(blog)
    }
    else{
        const blog = await Blog.findByIdAndUpdate(blogId, { $push:{ likes: loggedInUserId }, isLiked: true }, { new: true })
        res.json(blog)
    }
})

const dislikeBlog = asyncHandler( async (req, res) => {
    const { blogId } = req.body
    const loggedInUserId = req?.user?._id
    const blog = await Blog.findById(blogId)
    //find if the user has liked the blog
    const isDisliked = blog?.isDisliked
    //find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find((userId) => userId?.toString() === loggedInUserId.toString())
    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, { $pull:{ likes: loggedInUserId }, isLiked: false }, { new: true })
        return res.json(blog)
    }
    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, { $pull:{ dislikes: loggedInUserId }, isDisliked: false }, { new: true })
        res.json(blog)
    }
    else{
        const blog = await Blog.findByIdAndUpdate(blogId, { $push:{ dislikes: loggedInUserId }, isDisliked: true }, { new: true })
        res.json(blog)
    }
})

const uploadImage = asyncHandler( async(req, res) => {
    const { id } = req.params
    try{
        const uploader = (path) => cloudinaryUpload(path, 'images')
        const urls = []
        const files = req.files
        for (const file of files){
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const blog = await Blog.findByIdAndUpdate(id, { images: urls.map(file => { return file } ) }, { new: true })
        res.json(blog)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createBlog, updateBlog, getBlog, getBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImage }