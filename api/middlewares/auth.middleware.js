const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        try{
            if(token){
                const { id } = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findById(id)
                req.user=user
                next()
            }
        }
        catch(err){
            throw new Error('Not authorized token, Please Login')
        }
    }
    else{
        throw new Error('There is no token available')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user
    const adminUser = await User.findOne({ email: email })
    if(adminUser.role !== 'admin'){
        throw new Error('You are not an admin')
    }
    else{
        next()
    }
})

module.exports = { authMiddleware, isAdmin }