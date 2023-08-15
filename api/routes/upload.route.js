const express = require('express')
const router = express.Router()
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')
const { productImgResize, uploadImg } = require('../middlewares/uploadImages')
const { uploadImage, deleteImage } = require('../controllers/upload.controller')


router.post('/', authMiddleware, isAdmin, uploadImg.array('images', 10), productImgResize, uploadImage)
router.delete('/delete-image/:id', authMiddleware, isAdmin, deleteImage)

module.exports = router