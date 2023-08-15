const express = require('express')
const router = express.Router()
const { createBrand, updateBrand, deleteBrand, getBrand, getBrands } = require('../controllers/brand.controller')
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')


router.post('/', authMiddleware, isAdmin, createBrand)
router.put('/:id', authMiddleware, isAdmin, updateBrand)
router.delete('/:id', authMiddleware, isAdmin, deleteBrand)
router.get('/:id', getBrand)
router.get('/', getBrands)

module.exports = router