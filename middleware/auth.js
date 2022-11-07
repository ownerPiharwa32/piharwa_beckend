const jwt = require('jsonwebtoken');
const config = require('../config/config')
const constants = require('../constants/constants');
const userModel = require('../models/users')
const tokenModel = require('../models/token')


module.exports.VerifyToken = async function (req, res, next) {
    try {
        const token = await isValidToken(req.headers["authorization"]);
        if (!token.valid) {
           console.log("Srry")
        }
        user_id = token.data.id
        const userToken = await tokenModel.findOne({
            user_id: token.data.id,
            'accessToken': token.token
        });
        if (!userToken) {
            console.log("Srry")
        }

        const user = await userModel.findById({
            _id: userToken.user_id
        });
        req.user = { user_id : user.id, emailId : user.emailId , role: user.role } ,
        req.token = token.token
        next();
    } catch (e) {
        console.log(e,"Srry")
    }
}



const isValidToken = async function (token) {
    try {
        if (token) {
            token = token.replace("JWT ", "").replace("Bearer ", "");
            return {
                valid: true,
                data: await jwt.verify(token, config.jwt.jwtSecret),
                token: token,
            };
        }
        return {
            valid: false
        };
    } catch (error) {
        return {
            valid: false
        };
    }
};



module.exports.restrictTo = (...roles) => {
    try {
        const errmsg = "You do not have permission to perform this action";
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                res.json({ status: false, message: "You are not the authorized user" })
            }
            next();
        }
    } catch (error) {
        return next(error);
    }
};
