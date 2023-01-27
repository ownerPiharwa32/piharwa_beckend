
const Razorpay = require('razorpay');
const crypto = require("crypto");
var instance = new Razorpay({ key_id: process.env.RAZORPAYACCESSKEY, key_secret: process.env.RAZORPAYSECRETKEY })
const ordersModel = require('../models/orders')
const { ObjectId } = require('mongodb');

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
            await ordersModel.findOneAndUpdate({ razorpayOrderId: reqBody.razorpay_order_id }, {$set: { paymentStatus : "paid" }})
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
        let result = await ordersModel.aggregate([
            {
                $match: { "user_id": ObjectId(reqUser.user_id), "paymentStatus": "paid" }
            },
            {
                $lookup:
                {
                    from: 'products',
                    localField: 'productDetails.productID',
                    foreignField: '_id',
                    as: 'productData'
                }
            },
            {
                $unwind: "$productData"
            },
            {
                $group: {
                    _id: "$razorpayOrderId",
                    amount: { $first: "$amount" },
                    paymentStatus: { $first: "$paymentStatus" },
                    createdAt: { $first: "$createdAt" },
                    "items": {
                        "$addToSet": {
                            productTitle: "$productData.productTitle",
                            productSKU: "$productData.productSKU",
                            productImg: "$productData.productImg",
                        }
                    }

                }

            }

        ])
        return {
            status: true,
            message: "Order List fetched Successfully",
            data: result
        }
    } catch (e) {
        console.log(e)
    }

} 


module.exports.updateTrackingStatus = async(reqUser, reqParams) => {
    let orderId = reqParams.orderId;
    let trackingStatus = reqParams.status

    let result = await ordersModel.findOneAndUpdate({ razorpayOrderId: orderId }, { $set: { trackingStatus: trackingStatus } })
    
    return {
        status: true,
        message: "Tracking Status Update Successfully"
    }
}