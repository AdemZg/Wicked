const Color = require('../models/color.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createColor = asyncHandler ( async (req, res) => {
    try{
        const color = await Color.create(req.body)
        res.json(color)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateColor = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const color = await Color.findByIdAndUpdate(id, req.body, { new: true})
        res.json(color)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteColor = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await Color.findByIdAndDelete(id)
        res.json({message : "Color deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const getColor = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const color = await Color.findById(id)
        res.json(color)
    }
    catch(err){
        throw new Error(err)
    }
})

const getColors = asyncHandler ( async (req, res) => {
    try{
        const colors = await Color.find()
        res.json(colors)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createColor, updateColor , deleteColor, getColor, getColors }