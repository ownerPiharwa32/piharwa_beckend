
const Razorpay = require('razorpay');
const crypto = require("crypto");
var instance = new Razorpay({ key_id: process.env.RAZORPAYACCESSKEY, key_secret: process.env.RAZORPAYSECRETKEY })

module.exports.createOrderDetails = async (reqBody) => {
    try {
        var options = {
            amount: parseFloat(reqBody.amount) * 100,  // amount in the smallest currency unit
            currency: reqBody.currency
        };
        let orders = await instance.orders.create(options)
        console.log(orders)
        return {
            status: true,
            message: "Order Created Successfully",
            data: orders
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