const asyncHandler = require('express-async-handler')
const { cloudinaryDelete, cloudinaryUpload } = require("../utils/cloudinary")
const fs = require('fs')

const uploadImage = asyncHandler( async(req, res) => {
    try{
        const uploader = (path) => cloudinaryUpload(path, 'images')
        const urls = []
        const files = req.files
        for (const file of files){
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const images = urls.map((file) => { return file } )
        res.json(images) 
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteImage = asyncHandler( async(req, res) => {
    const { id } = req.params
    try{
        cloudinaryDelete(id, 'images')
        res.json({ message: "Image Deleted" })
    }
    catch(err){
        throw new Error(err)
    }
})


module.exports = { deleteImage, uploadImage}