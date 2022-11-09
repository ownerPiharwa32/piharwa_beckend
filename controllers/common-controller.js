
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