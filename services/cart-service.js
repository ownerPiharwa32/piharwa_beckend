const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const productModel = require('../models/Products')
const productCartModel = require('../models/productCart')
const { ObjectId } = require('mongodb');

module.exports.addProductInCart = async (reqUser, reqBody) => {
    let user_id = ObjectId(reqUser.user_id)
    let productDetails = reqBody.productDetails
    let cartArr = [];
    let result;
    for (let i = 0; i < productDetails.length; i++) {
        const productItems = productDetails[i];
        productItems.user_id = user_id;
        let productId = productItems.productId
        let existingProduct = await productCartModel.find({ user_id: ObjectId(user_id), productId: ObjectId(productId) })
        
        if (existingProduct.length > 0) {
            result = await productCartModel.findOneAndUpdate({ user_id: ObjectId(user_id), productId: ObjectId(productId) }, { $set: { quantity: productItems.quantity, sizes: productItems.sizes } })
            let existingProduct1 = await productCartModel.find({ user_id: ObjectId(user_id), productId: ObjectId(productId) })
            cartArr.push(existingProduct1)
        } else {
            result = await productCartModel.create(productItems)
            cartArr.push(result)
        }
        
        // cartArr.push(result)
    }

    return {
        status: true,
        message: "Added Cart Successfully!",
        data: cartArr
    }
}


module.exports.updateProductInCart = async (reqUser, reqBody) => {
    let user_id = ObjectId(reqUser.user_id)
    let result = await productCartModel.findOneAndUpdate({ user_id: user_id, _id: reqBody.cartId }, { $set: { productId: reqBody.productId, quantity: reqBody.quantity, sizes: reqBody.sizes } })

    return {
        status: true,
        message: "Update Cart Successfully!",
    }
}


module.exports.cartListing = async (reqUser) => {
    let result = await productCartModel.aggregate([
        {
            $match: {
                user_id: ObjectId(reqUser.user_id),
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productData"
            }
        },
        {
            $unwind: "$productData"
        },
        {
            $project: {
                productId: "$productData._id",
                productTitle: "$productData.productTitle",
                productSKU: "$productData.productSKU",
                productImg: "$productData.productImg",
                quantity: 1,
                sizes: 1,
                price: {$cond: [{$eq: ['$productData.allowDiscount', true]}, '$productData.discountPrice', '$productData.price' ]}
            }
        }
    ])
    return {
        status: true,
        message: "Cart Lsting Fetch Successfully!",
        data: result
    }
}


module.exports.deleteProductFromCart = async (reqUser, reqParams) => {
    let user_id = ObjectId(reqUser.user_id)
    await productCartModel.remove({ user_id: ObjectId(user_id), productId: ObjectId(reqParams.productId) })

    return {
        status: true,
        message: "Delete Product Successfully!",
    }
}