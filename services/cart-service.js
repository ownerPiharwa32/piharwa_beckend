const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const productModel = require('../models/Products')
const productCartModel = require('../models/productCart')
const { ObjectId } = require('mongodb');

module.exports.addProductInCart = async (reqUser, reqBody) => {
    let user_id = ObjectId(reqUser.user_id)
    let result = await productCartModel.updateOne({ user_id: user_id }, { $set: { productDetails: reqBody.productDetails } }, { upsert: true })
    return {
        status: true,
        message: "Added Cart Successfully!",
    }
}

module.exports.cartListing = async (reqUser) => {
    let result = await productCartModel.aggregate([
        {
            $match: {
                user_id: ObjectId(reqUser.user_id),
            }
        },
        { $unwind: { path: "$productDetails" } },
        {
            $lookup: {
                from: "products",
                localField: "productDetails.productId",
                foreignField: "_id",
                as: "productData"
            }
        },
        {
            $unwind: "$productData"
        },
        {
            $group: {
                _id: "$_id",
                "items": {
                    "$addToSet": {
                        productId: "$productData._id",
                        productTitle: "$productData.productTitle",
                        productSKU: "$productData.productSKU",
                        productImg: "$productData.productImg",
                        quantity: "$productDetails.quantity",
                        price: "$productData.price"
                    }
                }
            }
        }
    ])
    return result;
}