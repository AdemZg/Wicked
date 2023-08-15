const express = require('express')
const router = express.Router()
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware')
const { createCoupon, getCoupons, updateCoupon, getCoupon, deleteCoupon } = require('../controllers/coupon.controller')



router.get('/', authMiddleware, isAdmin, getCoupons)
router.get('/:id', authMiddleware, isAdmin, getCoupon)
router.post('/', authMiddleware, isAdmin, createCoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)



module.exports = router