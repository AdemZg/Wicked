const Brand = require('../models/brand.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createBrand = asyncHandler ( async (req, res) => {
    try{
        const brand = await Brand.create(req.body)
        res.json(brand)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateBrand = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true})
        res.json(brand)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteBrand = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await Brand.findByIdAndDelete(id)
        res.json({message : "Brand deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const getBrand = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const brand = await Brand.findById(id)
        res.json(brand)
    }
    catch(err){
        throw new Error(err)
    }
})

const getBrands = asyncHandler ( async (req, res) => {
    try{
        const brands = await Brand.find()
        res.json(brands)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createBrand, updateBrand , deleteBrand, getBrand, getBrands }