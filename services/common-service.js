const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const tokenModel = require('../models/token')

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