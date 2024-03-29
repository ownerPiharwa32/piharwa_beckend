const nodemailer = require("nodemailer");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const tokenModel = require('../models/token')
const userModel = require('../models/users')
const otpTokenService = require('../services/otpToken-service')
const otpTokenModel = require('../models/otpTokens')
const emailTemplate = require("../constants/emailTemplates")

var transporter = nodemailer.createTransport({
    host: config.emailSecret.SES_HOST_NAME,
    port: config.emailSecret.SES_HOST_NAME,
    secure: false,
  auth: {
    user: config.emailSecret.SES_USER_NAME,
    pass: config.emailSecret.SES_USER_PASSWORD
  }
  });


module.exports.generateToken = async (user_id, expiresIn) => {
    let token = jwt.sign(
        { id: user_id },
        config.jwt.jwtSecret , {
        		expiresIn: expiresIn || 86400    //in seconds
    });
    
    let refresh_token = jwt.sign({ id: user_id }, config.jwt.refreshTokenSecret , { expiresIn: 7776000 })
    return {
        "accesstoken": token,
        "refreshtoken" : refresh_token 
    };
};



module.exports.updateAccessToken = async (user_id, token) => {
    let result = await tokenModel.updateOne({ user_id: user_id }, { $set: { accessToken: token } }, { upsert: true })
    return result
}


module.exports.updateRefreshToken = async (user_id, token) => {
    let result = await tokenModel.updateOne({ user_id: user_id }, { $set: { refreshtoken: token } }, { upsert: true })
    return result
}



module.exports.forgetPassword = async function (reqBody) { 
    let randomNumber = await this.randomOtpGenerate()
    let emailId = reqBody.emailId
    let result = await userModel.findOne({ emailId: emailId }, { firstName: 1, lastName: 1, mobileNo: 1 })
    
    if (result.length > 0) { 
        await otpTokenService.createUserOtp(emailId, randomNumber);
        let mailObj = {
            emailId: emailId,
            subjectID: emailTemplate.forgetPasswordAuth.subject,
            emailTemplate: emailTemplate.forgetPasswordAuth.generateTemplate(randomNumber),
          };
          await commonService.sendMail(mailObj);
          return {
            status: true,
            message: "Email Sent Successfully"
          }
    } 
}


module.exports.randomOtpGenerate = async () =>{
    let random_number = Math.floor(100000 + Math.random() * 900000)
    return random_number
}

module.exports.validateEmail = async (emailId) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailId).toLowerCase());
}



module.exports.sendMail = async (mailObj) => {
    var mailOptions = {
        from: config.emailSecret.SES_USER_EMAIL,
        to: mailObj.emailId,
        subject: mailObj.subjectID,
        html: mailObj.emailTemplate
    };
    let info = await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports.logout = async (reqUser, user_token) => {
    let user_id = reqUser.user_id;
    const token = await tokenModel.findOneAndUpdate({ user_id: user_id, accessToken: user_token }, {$set:{ accessToken: "", refreshtoken: "" }});
    return {
        status: true,
        message: "Logged out successfully!",
    };
};

module.exports.contactEmail = async (reqBody) => {
    
    let emailTemplate = `<strong>Name : </strong> ${reqBody.firstName + ' ' + reqBody.lastName}<br><br><strong>Description : </strong> <p>${reqBody.description}</p><br><br>Best Regards,<br>${reqBody.firstName + ' ' + reqBody.lastName}`;

    var mailOptions = {
        from: reqBody.emailId,
        to: config.emailSecret.SES_USER_EMAIL,
        subject: reqBody.subject,
        html: emailTemplate
    };
    
    let info = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
    return {
        status: true,
        message: "Email Sent successfully!",
    };

}