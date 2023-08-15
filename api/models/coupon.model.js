const mongoose = require('mongoose')


var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        upperCase:true
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema)