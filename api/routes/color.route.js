const express = require('express')
const router = express.Router()
const { createColor, updateColor, deleteColor, getColor, getColors } = require('../controllers/color.controller.js')
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')


router.post('/', authMiddleware, isAdmin, createColor)
router.put('/:id', authMiddleware, isAdmin, updateColor)
router.delete('/:id', authMiddleware, isAdmin, deleteColor)
router.get('/:id', getColor)
router.get('/', getColors)

module.exports = router