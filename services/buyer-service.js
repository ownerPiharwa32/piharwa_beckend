const userModel = require('../models/users')
const buyerModel = require('../models/buyers')
const commonService = require('./common-service');
const otpTokenService = require('./otpToken-service')
const bcrypt = require("bcrypt");
const config = require("../config/config");
const emailTemplate = require("../constants/emailTemplates")
const moment = require('moment'); 

module.exports.buyersRegistration = async function (reqBody) {
  reqBody.role = 'buyers';
  let buyersrDetails = await userModel.create(reqBody)
  reqBody.user_id = buyersrDetails._id
  let buyerDetails = await buyerModel.create(reqBody)
  let result = {
    _id: buyerDetails._id,
    user_id: buyerDetails.user_id,
    firstName: buyerDetails.firstName,
    lastName: buyerDetails.lastName
  }
  return {
    status: true,
    message: "User Created Successfully!",
    data: result
  }
}




module.exports.buyersLogin = async function (reqBody) { 
    let emailId = reqBody.emailId
    let mobileNo = reqBody.mobileNo
    let user = await userModel.findOne({$or: [{mobileNo: mobileNo}, {"emailId" : emailId}], role: "buyers"})
   
  if (user != null) {
    if (reqBody.password != ''){
      if (await user.correctPassword(reqBody.password)) {
        const tokenDetails = await commonService.generateToken(user._id, config.jwt.web_timeout);
        let user_id = user._id
        await commonService.updateAccessToken(user_id, tokenDetails.accesstoken)
        await commonService.updateRefreshToken(user_id, tokenDetails.refreshtoken)
        return {
          status: true,
          message: "Buyer Login Successfully!",
          accessToken: tokenDetails.accesstoken,
          refreshToken: tokenDetails.refreshtoken
          }
        } else {
            return { "status": false, "message": "Invalid Password!" }
        }  
    } else {
      randomNumber = await commonService.randomOtpGenerate()
      await otpTokenService.createUserOtp(user.emailId, randomNumber);
        let mailObj = {
              emailId: user.emailId,
              subjectID: emailTemplate.signUpAuth.subject,
              emailTemplate: emailTemplate.signUpAuth.generateTemplate(randomNumber),
            };
      await commonService.sendMail(mailObj);
      return {
        status: true,
        message: "Email Sent Successfully"
        }
      }

    } else {
        return {"status": false , "message": "EmailId/mobileNo is Invalid!"}
    }
}



module.exports.verifyOTP = async (reqBody) => {
  let emailId = reqBody.emailId
  let mobileNo = reqBody.mobileNo
  let user = await userModel.findOne({ $or: [{ mobileNo: mobileNo }, { "emailId": emailId }], role: "buyers" })
  
  if (user != null) { 
    let otpDetails = await otpTokenService.findUserOtpUsingEmail(user.emailId)
    let currentTime = moment().format('DD-MM-YYYY HH:mm');
    let otpVerificationDate = moment(otpDetails.otpVerificationTime).add(5, 'minutes').format('DD-MM-YYYY HH:mm');
    if (otpVerificationDate > currentTime) {
      if (otpDetails.otpToken == reqBody.otpToken) {
        await otpTokenService.updateUserOtpStatus(user.emailId, reqBody.otpToken)
        const tokenDetails = await commonService.generateToken(user._id, config.jwt.web_timeout);
        let user_id = user._id
        await commonService.updateAccessToken(user_id, tokenDetails.accesstoken)
        await commonService.updateRefreshToken(user_id, tokenDetails.refreshtoken)
        return {
          status: true,
          message: "Buyer Login Successfully!",
          accessToken: tokenDetails.accesstoken,
          refreshToken: tokenDetails.refreshtoken
          }
  
      } else {
        return {"status": false , "message": "OTP token is Invalid!"}
      }
    } else {
      return {"status": false , "message": "Otp token is Expired"}
    }

  
  }
  else {
        return {"status": false , "message": "EmailId/mobileNo is Invalid!"}
  }

}