
const commonService = require('../services/common-service')
module.exports.forgetPassword = async (req, res) => { 
    try { 
        const result = await commonService.forgetPassword(req.body);
        res.json({ "status": true, "message": "Otp Send Successfully" });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});        
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const result = await commonService.logout(req.user, req.token);
        if (result.status) {
            res.json({ status: result.status, message: result.message })
        } 
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});        
    }
};

module.exports.contactEmail = async (req, res, next) => {
    try {
        const result = await commonService.contactEmail(req.body);
        if (result.status) {
            res.json({ status: result.status, message: result.message })
        } 
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});        
    }
};



