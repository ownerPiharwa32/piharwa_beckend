const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const commonService = require('./common-service');
const config = require("../config/config");
const {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");

module.exports.createSellerDetails = async function (reqBody) {
    reqBody.role = 'sellers';
    let sellerDetails = await userModel.create(reqBody)
    reqBody.user_id = sellerDetails._id
    let result = await sellerModel.create(reqBody)
    return result
}


module.exports.sellersLogin = async function (reqBody) { 
    let emailId = reqBody.emailId
    let user = await userModel.findOne({ "emailId": emailId })
   
    if (user != null) {
        
        if (await user.correctPassword(reqBody.password)) {
            const tokenDetails = await commonService.generateToken(user._id, config.jwt.web_timeout);
            let user_id = user._id
            await commonService.updateAccessToken(user_id, tokenDetails.accesstoken)
            await commonService.updateRefreshToken(user_id, tokenDetails.refreshtoken)
            return tokenDetails
            
            } else {
                return { "status": false, "message": "Invalid Password!" }
            }
    } else {
        return {"status": false , "message": "EmailId not Exist!"}
    }
}


module.exports.sellerDetails = async (reqUser) => {
    let result = await sellerModel.findOne({ user_id: reqUser.user_id })
    return result
}





module.exports.sellerProductsList = async (reqUser) => { 
    
    let result = await sellerModel.aggregate([
        {
            $match:  { user_id: ObjectId(reqUser.user_id) }
        },
        {

            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "SellerStoreID",
                as: "sellerShopName"
            }
        },
        {
            $unwind: "$sellerShopName"
        },
        {
            $project: {
                productId: "$sellerShopName._id",
                productTitle: "$sellerShopName.productTitle",
                SellerShopName: 1,
                productSKU: "$sellerShopName.productSKU",
                price: "$sellerShopName.price",
                currency: "$sellerShopName.currency",
                featuredProduct: "$sellerShopName.featuredProduct",
                createdAt: 1,
                updatedAt: 1
            },

        },


    ])
        
    return result
}

