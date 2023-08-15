const express = require('express')
const { registerUser, loginUser, logoutUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin } = require('../controllers/auth.controller')
const { handleRefreshToken } = require('../controllers/auth.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/login-admin', loginAdmin)
router.get('/logout', logoutUser)
router.post('/forgot-password', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/update-password', authMiddleware, updatePassword)
router.get('/refresh', handleRefreshToken)

module.exports = router