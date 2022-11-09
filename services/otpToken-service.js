const userModel = require('../models/users')
const otpTokenModel = require('../models/otpTokens')
const bcrypt = require("bcrypt");
const config = require("../config/config");
const moment = require('moment'); 

module.exports.createUserOtp = async (emailId, randomNumber) => {
    let result = await otpTokenModel.updateOne({ emailId: emailId }, { $set: { otpToken: randomNumber, status: false, otpVerificationTime:new Date()} }, { upsert: true })
    return result;
}

module.exports.findUserOtpUsingEmail = async (emailId) => {
    let result = await otpTokenModel.findOne({ emailId: emailId })
    return result;
}

module.exports.updateUserOtpStatus = async (emailId, randomNumber) => {
    let result = await otpTokenModel.findOneAndUpdate({ emailId: emailId, otpToken: randomNumber }, { $set: { status: true } })
    return result;
}
