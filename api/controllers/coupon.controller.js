const Coupon = require('../models/coupon.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createCoupon = asyncHandler( async(req, res) => {
    try{
        const coupon = await Coupon.create(req.body)
        res.json(coupon)
    }
    catch(err){
        throw new Error(err)
    }
})

const getCoupons = asyncHandler( async(req, res) => {
    try{
        const coupons = await Coupon.find()
        res.json(coupons)
    }
    catch(err){
        throw new Error(err)
    }
})

const getCoupon = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const coupon = await Coupon.findById(id)
        res.json(coupon)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateCoupon = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true })
        res.json(coupon)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteCoupon = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const coupon = await Coupon.findByIdAndDelete(id)
        res.json({message: "Deleted successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})





module.exports = { createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon }