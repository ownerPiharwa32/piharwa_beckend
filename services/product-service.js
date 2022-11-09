const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const productModel = require('../models/Products')
const { ObjectId } = require('mongodb');

module.exports.addProduct = async (reqBody) => {
    let result = await productModel.create(reqBody)
    return result
}

module.exports.updateProductDetails = async (reqBody) => { 
    let result = await productModel.findByIdAndUpdate({ _id: reqBody.productId }, { $set: reqBody })
    return result
}



module.exports.productListing = async () => { 
    let result = await productModel.find()
    return result
}

module.exports.getSingleproduct = async (reqParams) => {
    let result = await productModel.findOne({_id: reqParams.id})
    return result
}