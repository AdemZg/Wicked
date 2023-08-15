const Enquiry = require('../models/enq.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')


const createEnquiry = asyncHandler ( async (req, res) => {
    try{
        const enquiry = await Enquiry.create(req.body)
        res.json(enquiry)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateEnquiry = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const enquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true})
        res.json(enquiry)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteEnquiry = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await Enquiry.findByIdAndDelete(id)
        res.json({message : "Enquiry deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const getEnquiry = asyncHandler ( async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const enquiry = await Enquiry.findById(id)
        res.json(enquiry)
    }
    catch(err){
        throw new Error(err)
    }
})

const getEnquiries = asyncHandler ( async (req, res) => {
    try{
        const enquiries = await Enquiry.find()
        res.json(enquiries)
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { createEnquiry, updateEnquiry , deleteEnquiry, getEnquiry, getEnquiries }