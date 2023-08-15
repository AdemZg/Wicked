const Razorpay = require("razorpay")
const instance = new Razorpay({ key_id:"rzp_test_vblEgzparscRbJ", key_secret:"Y0Slskg0LS1icdxWkJLJTxDK" })

const checkout = async (req, res) => {
    const { amount } = req.body
    const option = { amount: amount * 100, currency: "USD" } 
    try{
        const order = await instance.orders.create(option)
        res.json({order, success: true})
    }
    catch(err){
        throw new Error(err)
    }
}

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body
    res.json({razorpayOrderId, razorpayPaymentId})
}


module.exports = { checkout, paymentVerification }