const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const router = express.Router()
const { getUsers, 
    getUser, 
    deleteUser, 
    updateUser, 
    blockUser, 
    unblockUser, 
    getWishlist, 
    saveUserAddress, 
    getUserCart, 
    addToCart, 
    emptyCart, 
    applyCoupon,
    createOrder,
    getUserOrders,
    updateOrderStatus,
    getAllOrders,
    getOrderByUserId,
    getUserById,
    getAllUserOrders,
    deleteOrderById,
    removeProductFromCart,
    updateQuantityFromCart,
    getMyOrders,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders, 
} = require('../controllers/user.controller')
const { checkout, paymentVerification } = require('../controllers/payment.controller')

router.get('/all', getUsers)
router.get('/', authMiddleware, getUser)
router.get('/wishlist', authMiddleware, getWishlist)
router.get('/cart', authMiddleware, getUserCart)
router.get('/getMonthWiseOrderIncome', authMiddleware, getMonthWiseOrderIncome)
router.get('/getYearlyTotalOrders', authMiddleware, getYearlyTotalOrders)
router.get('/my-orders', authMiddleware, getMyOrders)
// router.get('/user-orders', authMiddleware, getUserOrders)
router.get('/orders', authMiddleware, isAdmin,  getAllOrders)
// router.get('/all-user-orders/:id', authMiddleware, isAdmin,  getAllUserOrders)
router.get('/:id',authMiddleware, isAdmin, getUserById)
router.post('/order/checkout', authMiddleware, checkout)
router.post('/order/payment-verification', authMiddleware, paymentVerification)
router.post('/cart', authMiddleware, addToCart)
// router.post('/cart/apply-coupon', authMiddleware, applyCoupon)
router.post('/cart/create-order', authMiddleware, createOrder)
// router.get('/user-order/:id', authMiddleware, isAdmin, getOrderByUserId)
// router.delete('/cart', authMiddleware, emptyCart)
router.delete('/delete-product-cart/:id', authMiddleware, removeProductFromCart)
router.delete('/:id', authMiddleware, isAdmin, deleteUser)
// router.delete('/delete-order/:id', authMiddleware, isAdmin, deleteOrderById)
router.put('/edit', authMiddleware, updateUser)
router.put('/save-address', authMiddleware, saveUserAddress)
router.put('/update-quantity-cart/:id', authMiddleware, updateQuantityFromCart)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)
// router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus)


module.exports = router