const User = require('../models/user.model.js')
const Product = require('../models/product.model.js')
const Cart = require('../models/cart.model.js')
const Coupon = require('../models/coupon.model.js')
const Order = require('../models/order.model.js')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validate.mongodbid.js') 
const uniqid = require('uniqid')


const getUsers = asyncHandler (async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        throw new Error(err)
    }
})

const getUser = asyncHandler (async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const user = await User.findById(_id)
        res.json(user)
    }
    catch(err){
        throw new Error(err)
    }
})

const getUserById = asyncHandler (async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        const user = await User.findById(id)
        res.json(user)
    }
    catch(err){
        throw new Error(err)
    }
})

const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await User.findByIdAndDelete(id)
        res.json({message: "User deleted"})
    }
    catch(err){
        throw new Error(err)
    }
})

const updateUser = asyncHandler (async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const user = await User.findByIdAndUpdate(_id, 
            {
            firstname: req.body?.firstname, 
            lastname: req.body?.lastname, 
            email: req.body?.email, 
            mobile: req.body?.mobile 
            }, 
            { new: true })
        res.json(user)
    }
    catch(err){
        throw new Error(err)
    }
})

const saveUserAddress = asyncHandler (async (req, res, next) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const user = await User.findByIdAndUpdate(_id, { address: req.body?.address }, { new: true })
        res.json(user)
    }
    catch(err){
        throw new Error(err)
    }
})

const blockUser = asyncHandler (async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await User.findByIdAndUpdate(id,{ isBlocked: true }, { new: true })
        res.json({ message : "User Blocked" })
    }
    catch(err){
        throw new Error(err)
    }
})

const unblockUser = asyncHandler (async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try{
        await User.findByIdAndUpdate(id,{ isBlocked: false }, { new: true })
        res.json({ message : "User Unblocked" })
    }
    catch(err){
        throw new Error(err)
    }
})

const getWishlist = asyncHandler (async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const user = await User.findById(_id).populate('wishlist')
        res.json(user)
    }
    catch(err){
        throw new Error(err)
    }

})

const addToCart = asyncHandler (async (req, res) => {
    const { productId,color,quantity,price } = req.body
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        let newCart = new Cart({
            userId: _id,
            productId,
            quantity,
            price,
            color
        })
        await newCart.save()
        res.json(newCart)
    }
    catch(err){
        throw new Error(err)
    }
})

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const cart = await Cart.find({ userId: _id }).populate("productId").populate('color')
        res.json(cart)
    }
    catch(err){
        throw new Error(err)
    }
})

const updateQuantityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { id } = req.params
    const { quantity } = req.body
    validateMongoDbId(_id)
    try{
        const cartToUpdateQuantity = await Cart.findOne({ userId: _id, _id: id })
        cartToUpdateQuantity.quantity = quantity
        cartToUpdateQuantity.save()
        res.json(cartToUpdateQuantity)
    }
    catch(err){
        throw new Error(err)
    }
})

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { id } = req.params
    validateMongoDbId(_id)
    try{
        const cartToDelete = await Cart.deleteOne({ userId: _id, _id: id })
        res.json(cartToDelete)
    }
    catch(err){
        throw new Error(err)
    }
})

const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo,orderItems,totalPrice,totalPriceAfterDiscount,paymentInfo } = req.body
    const { _id } = req.user
    try{
        const order = await Order.create({shippingInfo,orderItems,totalPrice,totalPriceAfterDiscount,paymentInfo, user: _id})
        res.json({order, success:true})
    }
    catch(err){
        throw new Error(err)
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongoDbId(_id)
    try{
        const orders = await Order.find({ user: _id }).populate("user").populate("orderItems.product")
        res.json(orders)
    }
    catch(err){
        throw new Error(err)
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find().populate('orderItems.product').populate('user')
        res.json(orders)
    }
    catch(err){
        throw new Error(err)
    }
})

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
    let month = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]
    let d = new Date()
    let endDate = ""
    d.setDate(1)
    for (let i = 0; i < 11; i++) {
        d.setMonth(d.getMonth() - 1)
        endDate = month[d.getMonth() + " " + d.getFullYear()]
    }
    try{
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },{
                $group:{
                    _id: {
                        month: "$month"
                    }, amount: {
                        $sum: "$totalPriceAfterDiscount"
                    },count: {
                        $sum: 1
                    }
                }
            }
        ])
        res.json(data)
    }
    catch(err){
        throw new Error(err)
    }
})

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
    let month = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]
    let d = new Date()
    let endDate = ""
    d.setDate(1)
    for (let i = 0; i < 11; i++) {
        d.setMonth(d.getMonth() - 1)
        endDate = month[d.getMonth() + " " + d.getFullYear()]
    }
    try{
        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },{
                $group:{
                    _id: null, 
                    count: { $sum: 1 },
                    amount:{ $sum: "$totalPriceAfterDiscount"}
                }
            }
        ])
        res.json(data)
    }
    catch(err){
        throw new Error(err)
    }
})


// const emptyCart = asyncHandler(async (req, res) => {
//     const { _id } = req.user
//     validateMongoDbId(_id)
//     try{
//         const user = await User.findById(_id) 
//         await Cart.findOneAndRemove({ orderBy: user._id })
//         res.json({message: 'Cart Deleted'})
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const applyCoupon = asyncHandler(async (req,res) => {
//     const { _id } = req.user
//     const { coupon } = req.body
//     validateMongoDbId(_id)
//     try{
//         const validCoupon = await Coupon.findOne({ name: coupon })
//         if(!validCoupon) throw new Error('Invalid Coupon')
//         const user = await User.findById(_id)
//         let { products, cartTotal } = await Cart.findOne({ orderBy: user._id }).populate("products.product")
//         let totalAfterDiscount = (cartTotal - ((cartTotal * validCoupon.discount)/100)).toFixed(2)
//         await Cart.findOneAndUpdate({ orderBy: user._id }, { totalAfterDiscount: totalAfterDiscount}, { new: true })
//         return res.json({totalAfterDiscount: totalAfterDiscount})
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const createOrder = asyncHandler(async (req, res) => {
//     const { _id } = req.user
//     //COD => Cash on Delivery
//     const { COD, couponApplied } = req.body
//     validateMongoDbId(_id)
//     try{
//         if(!COD) throw new Error('Create cash order failed')
//         const user = await User.findById(_id)
//         let userCart = await Cart.findOne({ orderBy: user._id })
//         let finalAmount = 0
//         if(couponApplied && userCart.totalAfterDiscount){
//             finalAmount = userCart.totalAfterDiscount 
//         }
//         else{
//             finalAmount = userCart.cartTotal
//         }
//         let newOrder = new Order({
//             products: userCart.products,
//             paymentIntent:{
//                 id: uniqid(),
//                 method: "COD",
//                 amount: finalAmount,
//                 status: "Cash on Delivery",
//                 created: Date.now(),
//                 currency: "usd"
//             },
//             orderBy: user._id,
//             orderStatus: "Cash on Delivery"
//         })
//         await newOrder.save()
//         let update = userCart.products.map((item) =>{
//             return {
//                 updateOne: {
//                     filter: { _id: item.product._id },
//                     update: { $inc: { quantity: -item.count, sold: +item.count } }    
//                 }               
//             }
//         })
//         await Product.bulkWrite(update, {})
//         res.json({message : "Order created and Product updated successfully"})
//     }
//     catch(err) {
//         throw new Error(err)
//     }
// })

// const getUserOrders = asyncHandler(async (req, res) => {
//     const { _id } = req.user
//     validateMongoDbId(_id)
//     try{
//         const orders = await Order.findOne({ orderBy: _id }).populate('products.product')
//         res.json(orders)
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const getOrderByUserId = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     try{
//         const order = await Order.findOne({ orderBy: id }).populate('products.product').populate('orderBy').exec()
//         res.json(order)
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const getAllUserOrders = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     try{
//         const order = await Order.find({ orderBy: id }).populate('products.product').populate('orderBy').exec()
//         res.json(order)
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body
//     const { id } = req.params
//     validateMongoDbId(id)
//     try{
//         const order = await Order.findByIdAndUpdate(id, { orderStatus: status, paymentIntent: { status: status } }, { new: true })
//         res.json(order)
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })

// const deleteOrderById = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     validateMongoDbId(id)
//     try{
//         await Order.findByIdAndDelete(id)
//         res.json({message:'Order deleted successfully'})
//     }
//     catch(err){
//         throw new Error(err)
//     }
// })


module.exports = { 
    getUsers, 
    getUser, 
    deleteUser, 
    updateUser, 
    blockUser, 
    unblockUser, 
    getWishlist, 
    saveUserAddress, 
    addToCart, 
    getUserCart, 
    createOrder,
    getUserById,
    removeProductFromCart,
    updateQuantityFromCart,
    getMyOrders,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
    getAllOrders
} 