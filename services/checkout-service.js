
const Razorpay = require('razorpay');
const crypto = require("crypto");
var instance = new Razorpay({ key_id: process.env.RAZORPAYACCESSKEY, key_secret: process.env.RAZORPAYSECRETKEY })
const ordersModel = require('../models/orders')

module.exports.createOrderDetails = async (reqUser, reqBody) => {
    try {
        var options = {
            amount: parseFloat(reqBody.amount) * 100,  // amount in the smallest currency unit
            currency: reqBody.currency
        };
        let orders = await instance.orders.create(options)
        reqBody.user_id = reqUser.user_id;
        reqBody.razorpayOrderId = orders.id;
        reqBody.paymentStatus = orders.status
        let result = await ordersModel.create(reqBody)
        return {
            status: true,
            message: "Order Created Successfully",
            data: result
        }
    } catch (e) {
        console.log(e)
    }

}


module.exports.paymentVerify = async (reqBody) => {
    try {
        let body = reqBody.razorpay_order_id + "|" + reqBody.razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAYSECRETKEY)
            .update(body.toString())
            .digest('hex');
        console.log("sig received ", reqBody.razorpay_signature);
        console.log("sig generated ", expectedSignature);
        var response = { "signatureIsValid": "false" }
        if (expectedSignature === reqBody.razorpay_signature) {
            response = { "signatureIsValid": "true" }
        }

        return {
            status: true,
            message: "Payment Verified Successfully",
            data: response
        }

    } catch (e) {
        console.log(e)
    }
}



module.exports.orderDetailList = async (reqUser) => {
    try {
        await ordersModel.aggregate([])
        return {
            status: true,
            message: "Order List fetched Successfully",
            data: orders
        }
    } catch (e) {
        console.log(e)
    }

} 