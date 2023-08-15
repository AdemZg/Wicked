const express = require('express')
const router = express.Router()
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct, addToWishlist, rating } = require('../controllers/product.controller')


router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/:id', getProduct)
router.get('/', getProducts)
router.put('/wishlist', authMiddleware, addToWishlist)
router.put('/rating', authMiddleware, rating)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)


module.exports = router