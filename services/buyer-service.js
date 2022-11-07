const userModel = require('../models/users')
const buyerModel = require('../models/buyers')
const commonService = require('./common-service');
const bcrypt = require("bcrypt");
const config = require("../config/config");

module.exports.buyersRegistration = async function (reqBody) { 
    reqBody.role = 'buyers';
    let buyersrDetails = await userModel.create(reqBody)
    reqBody.user_id = buyersrDetails._id
    let result = await buyerModel.create(reqBody)
    return result
}



module.exports.buyersLogin = async function (reqBody) { 
    let emailId = reqBody.emailId
    let user = await userModel.findOne({ "emailId": emailId, role:"buyers" })
   
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
