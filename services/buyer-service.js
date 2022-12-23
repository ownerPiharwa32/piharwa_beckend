const userModel = require('../models/users')
const buyerModel = require('../models/buyers')
const addressModel = require('../models/addressDetail')
const commonService = require('./common-service');
const otpTokenService = require('./otpToken-service')
const bcrypt = require("bcrypt");
const config = require("../config/config");
const emailTemplate = require("../constants/emailTemplates")
const moment = require('moment');
const { ObjectId } = require('mongodb');

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
  let username = reqBody.username
  let user = await userModel.findOne({ $or: [{ "mobileNo": username }, { "emailId": username }], role: "buyers" })

  if (user != null) {
    if (reqBody.password != '') {
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
    return { "status": false, "message": "EmailId/mobileNo is Invalid!" }
  }
}



module.exports.verifyOTP = async (reqBody) => {
  let username = reqBody.username
  let user = await userModel.findOne({ $or: [{ mobileNo: username }, { "emailId": username }], role: "buyers" })

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
        return { "status": false, "message": "OTP token is Invalid!" }
      }
    } else {
      return { "status": false, "message": "Otp token is Expired" }
    }


  }
  else {
    return { "status": false, "message": "EmailId/mobileNo is Invalid!" }
  }

}



module.exports.addAddreesDetails = async (reqUser, reqBody) => {
  try {
    reqBody.user_id = ObjectId(reqUser.user_id)
    let addressDetails = await addressModel.findOneAndUpdate({ "user_id": reqUser.user_id, "default": true }, {
      $set: { "default": false }
    })
    let result = await addressModel.create(reqBody)
    return {
      status: true,
      message: "Address Updated Successfully"
    }
  } catch (e) {
    return { "status": false, "message": "Please Provide Valid Address Details" }
  }
}


module.exports.editAddreesDetails = async (reqUser, reqBody) => {
  try {

    if (reqBody.default == true) {
      let addressDetails = await addressModel.findOneAndUpdate({ "user_id": reqUser.user_id, "default": true }, {
        $set: { "default": false }
      })
    }
    await addressModel.findOneAndUpdate({ "_id": reqBody.addressId, "user_id": reqUser.user_id }, {
      $set: {
        "firstName": reqBody.firstName,
        "lastName": reqBody.lastName,
        "mobileNo": reqBody.mobileNo,
        "default": reqBody.default,
        "address_line_one": reqBody.address_line_one,
        "address_line_two": reqBody.address_line_two,
        "landmark": reqBody.landmark,
        "city": reqBody.city,
        "state": reqBody.state,
        "country": reqBody.country,
        "pincode": reqBody.pincode
      }
    })

    return {
      status: true,
      message: "Address Updated Successfully"
    }
  } catch (e) {
    return { "status": false, "message": "Please Provide Valid Address Details" }
  }
}



module.exports.getAddreesDetails = async (reqUser, reqBody) => {
  try {
    reqBody.user_id = ObjectId(reqUser.user_id)
    let result = await addressModel.find({ "user_id": ObjectId(reqUser.user_id) })

    return {
      status: true,
      message: "Address List Fetched Successfully",
      data: result
    }
  } catch (e) {
    return { "status": false, "message": "You Don't have any Address Details" }
  }
}

module.exports.deleteAddreesDetails = async (reqUser, reqParams) => {
  try {
    await addressModel.remove({ user_id: reqUser.user_id, _id: reqParams.addressId })
    return {
      status: true,
      message: "Address Deleted Successfully",
    }
  } catch (e) {
    return { "status": false, "message": "You Don't have any Address Details" }
  }
}


module.exports.listDetails = async (reqBody) => {
  try {
    const page = reqBody.pageNo * 1 || 1;
    const limit = reqBody.noRecord * 1 || 10;
    const skip = (page - 1) * limit;

    let buyerDetails = await buyerModel.aggregate([{
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "buyers"
      }
    },
    {
      $unwind: "$buyers"
    },
    {
      $project: {
        user_id: 1,
        firstName: 1,
        lastName: 1,
        emailId: '$buyers.emailId',
        mobileNo: '$buyers.mobileNo'
      }
    }

    ])


    const paginatedItems = buyerDetails.slice(skip).slice(0, limit);
    const total = buyerDetails.length
    const total_pages = Math.ceil(total / limit)

    return {
      status: true,
      message: "Buyer List Fetched Successfully",
      data: {
        per_page: limit,
        total: total,
        total_pages: total_pages,
        buyerList: paginatedItems
    }
    }
  } catch (e) {
    return { "status": false, "message": "Buyers List are not Available" }
  }
}