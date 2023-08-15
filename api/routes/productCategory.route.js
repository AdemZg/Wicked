const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const { createCategory, updateCategory, deleteCategory, getCategory, getCategories } = require('../controllers/productCategory.controller')


router.post('/', authMiddleware, isAdmin, createCategory)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/:id', getCategory)
router.get('/', getCategories)


module.exports = router