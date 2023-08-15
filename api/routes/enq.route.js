const express = require('express')
const router = express.Router()
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getEnquiries } = require('../controllers/enq.controller.js')
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')


router.post('/', createEnquiry)
router.put('/:id', authMiddleware, isAdmin, updateEnquiry)
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry)
router.get('/:id', getEnquiry)
router.get('/', getEnquiries)

module.exports = router