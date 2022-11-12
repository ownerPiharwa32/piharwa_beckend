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



module.exports.productListing = async (page_no, no_record) => { 
    let productDetails = await productModel.find()
    const page = page_no * 1 || 1;
    const limit = no_record * 1 || 10;
    const skip = (page - 1) * limit;
    const paginatedItems = productDetails.slice(skip).slice(0, limit);
    const total = productDetails.length
    const total_pages = Math.ceil(total / limit)
    return {
        status: true,
        message: "List Fetched Successfully!",
        data: {
            per_page: limit,
            total: total,
            total_pages: total_pages,
            productList: paginatedItems
        }
    }
}

module.exports.getSingleproduct = async (reqParams) => {
    let result = await productModel.findOne({_id: reqParams.id})
    return result
}


module.exports.updateImgForProduct = async (fileLocation, reqParams) => {
    let imgObj = {
        product_img: fileLocation,
        default: reqParams.default
    }

    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $push: {
            product_imgs: [imgObj]
        } })
    return result
}


module.exports.removeProductImgs = async (reqParams) => { 
    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $pull: {
            product_imgs: {_id: reqParams.productImgId}
        } })
    return result
}   