const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: "duaeegjoo",
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

  const cloudinaryUpload = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.secure_url, asset_id: result.asset_id, public_id: result.public_id  }, { resource_type: "auto" })
        })
    })
  }

  const cloudinaryDelete = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(file, (result) => {
            resolve({ url: result.secure_url, asset_id: result.asset_id, public_id: result.public_id  }, { resource_type: "auto" })
        })
    })
  }

  module.exports = { cloudinaryUpload, cloudinaryDelete }