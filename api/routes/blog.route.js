const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const { createBlog, updateBlog, getBlog, getBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImage } = require('../controllers/blog.controller')
const { blogImgResize, uploadImg } = require('../middlewares/uploadImages')


router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/upload/:id', authMiddleware, isAdmin, uploadImg.array('images', 2), blogImgResize, uploadImage)
router.put('/like', authMiddleware, likeBlog)
router.put('/dislike', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/', getBlogs)
router.get('/:id', getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)


module.exports = router