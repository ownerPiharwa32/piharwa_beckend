
const buyerService = require('../services/buyer-service')


module.exports.buyersRegistration = async function (req, res) {
    try {
        const result = await buyerService.buyersRegistration(req.body);
        res.json({"status": true , "message": result.message, "data": result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.buyersLogin = async (req,res) => {
    try {
        const result = await buyerService.buyersLogin(req.body);
        if (result.status != false) {
            res.json({ status: true, message: result.message, accessToken: result.accessToken, refreshToken: result.refreshToken });
        } else {
            res.json({ status: false, message: result.message })
        }
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}


module.exports.verifyOTP = async (req, res) => {
    try {
        const result = await buyerService.verifyOTP(req.body);
        res.json({status: true , message: result.message, accessToken: result.accessToken, refreshToken: result.refreshToken });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}


module.exports.addAddreesDetails = async (req, res) => {
    try {
        const result = await buyerService.addAddreesDetails(req.user, req.body);
        res.json({status: true , message: result.message });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}


module.exports.editAddreesDetails = async (req, res) => {
    try {
        const result = await buyerService.editAddreesDetails(req.user, req.body);
        res.json({status: true , message: result.message });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}

module.exports.getAddreesDetails = async (req, res) => {
    try {
        const result = await buyerService.getAddreesDetails(req.user, req.body);
        res.json({"status": true , "message": result.message, "data": result.data });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}

module.exports.deleteAddreesDetails = async (req, res) => { 
    try {
        const result = await buyerService.deleteAddreesDetails(req.user, req.params);
        res.json({"status": true , "message": result.message });
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}
