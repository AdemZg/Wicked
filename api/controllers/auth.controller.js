const User = require('../models/user.model.js')
const bcrypt = require('bcrypt') 
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/jwtToken.js')
const generateRefreshToken = require('../config/refreshToken.js')
const jwt = require('jsonwebtoken')
const validateMongoDbId = require('../utils/validate.mongodbid.js')
const crypto = require('crypto')
const sendEmail = require('./email.controller.js')

const registerUser = asyncHandler( async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email: email})
    if(!user){
        newUser = await User.create(req.body)
        res.json(newUser)
    }
    else{
        throw new Error('User Alreadt Exists')
    }
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if(user && (await user.isPasswordMatched(password))){
        const refreshToken = generateRefreshToken(user?._id)
        await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 72 * 60 * 60 * 1000 })
        res.json({
        _id: user?._id, 
        firstname: user?.firstname, 
        lastname: user?.lastname, 
        email: user?.email, 
        mobile: user?.mobile, 
        token: generateToken(user?._id)
        }) 
    }
    else{
        throw new Error('Invalid Credentials')
    }
})

const loginAdmin = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const admin = await User.findOne({ email: email })
    if(admin.role !== 'admin') throw new Error('You are not authorized')
    if(admin && (await admin.isPasswordMatched(password))){
        const refreshToken = generateRefreshToken(admin?._id)
        await User.findByIdAndUpdate(admin._id, { refreshToken: refreshToken }, { new: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 72 * 60 * 60 * 1000 })
        res.json({
        _id: admin?._id, 
        firstname: admin?.firstname, 
        lastname: admin?.lastname, 
        email: admin?.email, 
        mobile: admin?.mobile, 
        token: generateToken(admin?._id)
        }) 
    }
    else{
        throw new Error('Invalid Credentials')
    }
})

const logoutUser = asyncHandler( async(req, res) => {
    const cookie = req.cookies
    if(!cookie.refreshToken) throw new Error('No Refresh Token in cookie')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken: refreshToken })
    if(!user){
        res.clearCookie('refreshToken', { httpOnly: true, secure: true }) 
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: ''})
    res.clearCookie('refreshToken', { httpOnly: true, secure: true }) 
    res.sendStatus(204)
})

const updatePassword = asyncHandler( async (req, res) => {
    const { _id } = req.user
    const { currentPassword, password, password2 } = req.body
    validateMongoDbId(_id)
    const user = await User.findById(_id)
    console.log(user.password)
    if(await user.isPasswordMatched(currentPassword)){
        if(password === password2){
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt)
            await User.findByIdAndUpdate(_id, { password: newPassword}, { new: true })
            return res.json({ message: "Password Updated Successfully !" })
        }
        else{
            throw new Error("Your new Password Should Be Similar !")
        }
    }
    else{
        throw new Error("Current Password is Invalid !")
    }
})

const forgotPasswordToken = asyncHandler( async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if(!user) throw new Error('Invalid email')
    try{
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `Hi, Please follow this link to reset your password.<a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`
        const data = { to:email, text:"Hello, User", subject: "Forgot password Link", html:resetURL, }
        sendEmail(data)
        res.json(token)
    }
    catch(err) {
        throw new Error(err)
    }
})

const resetPassword = asyncHandler( async (req, res) => {
    const { password, password2 } = req.body
    const { token } = req.params
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })
    if(!user) throw new Error("Token expired, Please try again later")
    if(password === password2){
        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        res.json(user)
    }
    else{
        throw new Error("Passwords Do Not Match")
    }
})

const handleRefreshToken = asyncHandler( async (req, res) => {
    const cookie = req.cookies
    if(!cookie.refreshToken) throw new Error('No Refresh Token in cookie')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken: refreshToken })
    if(!user) throw new Error('No Refresh Token in db or not matched')
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, payload) => {
        if(err || user.id !== payload.id){
            console.log(user._id)
            throw new Error('Refresh token is not valid')
        }
        const accessToken = generateToken(user._id)
        res.json({accessToken})
    })
})


module.exports = { registerUser, loginUser, handleRefreshToken,logoutUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin }