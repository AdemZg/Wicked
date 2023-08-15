const BCategory = require('../models/blogCategory.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createCategory = asyncHandler ( async (req, res) => {
    try{
        const category = await BCategory.create(req.body)
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
        const category = await BCategory.findByIdAndUpdate(id, req.body, { new: true})
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
        await BCategory.findByIdAndDelete(id)
        res.json({ message : "Blog Category deleted Successfully" })
    }
    catch(err){
        throw new Error(err)
    }
})

const getCategory = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const category = await BCategory.findById(id)
        res.json(category)
    }
    catch(err){
        throw new Error(err)
    }
})

const getCategories = asyncHandler ( async (req, res) => {
    try{
        const categories = await BCategory.find()
        res.json(categories)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createCategory, updateCategory , deleteCategory, getCategory, getCategories }