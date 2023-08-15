const PCategory = require('../models/productCategory.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createCategory = asyncHandler ( async (req, res) => {
    try{
        const category = await PCategory.create(req.body)
        res.json(category)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateCategory = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const category = await PCategory.findByIdAndUpdate(id, req.body, { new: true})
        res.json(category)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteCategory = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await PCategory.findByIdAndDelete(id)
        res.json({message : "Product Category deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const getCategory = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const category = await PCategory.findById(id)
        res.json(category)
    }
    catch(err){
        throw new Error(err)
    }
})

const getCategories = asyncHandler ( async (req, res) => {
    try{
        const categories = await PCategory.find()
        res.json(categories)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createCategory, updateCategory , deleteCategory, getCategory, getCategories }