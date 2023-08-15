const Product = require('../models/product.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js')
const slugify = require ('slugify')
const User = require('../models/user.model.js')


const createProduct = asyncHandler( async(req, res) => {
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.create(req.body)
        res.json(product)
    }
    catch(err){
        throw new Error(err)
    }
})

const getProduct = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const product = await Product.findById(id).populate('color')
        res.json(product)
    }
    catch(err){
        throw new Error(err)
    }
})

const getProducts = asyncHandler( async(req, res) => {
    try{
        //filtering
        const query = { ...req.query }
        const excludeFields = ['page','sort','limit','fields']
        excludeFields.forEach(field => delete query[field])
        let queryStr = JSON.stringify(query)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let finalQuery = Product.find(JSON.parse(queryStr))
        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            finalQuery = finalQuery.sort(sortBy)
        }
        else{
            finalQuery = finalQuery.sort('-createdAt')
        }
        //limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            finalQuery = finalQuery.select(fields)
        }
        else{
            finalQuery = finalQuery.select('-__v')
        }
        //pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        finalQuery = finalQuery.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await Product.countDocuments()
            if(skip >= productCount) throw new Error('This Page does not exist')
        }
        const products =  await finalQuery
        res.json(products)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateProduct = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.findByIdAndUpdate(id, req.body , { new: true })
        res.json(product)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteProduct = asyncHandler( async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const product = await Product.findByIdAndDelete(id)
        res.json({message : "Product deleted Successfully"})
    }
    catch(err){
        throw new Error(err)
    }
})

const addToWishlist = asyncHandler( async(req, res) => {
    const { _id } = req.user
    const { prodId } = req.body
    validateMongoDbId(_id)
    validateMongoDbId(prodId)
    try{
        const user = await User.findById(_id)
        //checking if the product has already been added to the user whislit
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId)
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id, { $pull: { wishlist: prodId } }, { new: true })
            res.json(user)
        }
        else{
            let user = await User.findByIdAndUpdate(_id, { $push: { wishlist: prodId } }, { new: true })
            res.json(user)
        }
    }
    catch(err){
        throw new Error(err)
    }
})

const rating = asyncHandler( async(req, res) => {
    const { _id } = req.user
    const { star, prodId, comment } = req.body
    validateMongoDbId(_id)
    validateMongoDbId(prodId)
    try{
        const product = await Product.findById(prodId)
        //check if the product has already been added rated 
        const alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString())
        if(alreadyRated){
            await Product.updateOne({ ratings: alreadyRated  }, { $set: { "ratings.$.star": star, "ratings.$.comment": comment } }, { new: true }) 
        }
        else{
            await Product.findByIdAndUpdate(prodId, { $push: { ratings: { star: star, postedBy: _id, comment: comment } } }, { new: true })
        }
        const getProduct = await Product.findById(prodId)
        let totalRatings = getProduct.ratings.length
        let ratingsSum = getProduct.ratings.map((item) => item.star).reduce((prev,curr) => prev+curr, 0)
        let finalRatings = Math.round(ratingsSum / totalRatings)
        const Ratedproduct = await Product.findByIdAndUpdate(prodId, { totalRatings: finalRatings}, { new: true })
        res.json(Ratedproduct)
    }
    catch(err){
        throw new Error(err)
    }
})



module.exports = { createProduct, getProduct, getProducts, updateProduct, deleteProduct, addToWishlist, rating }