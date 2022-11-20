const sellersService = require('../services/sellers-service')

module.exports.sellersRegistration = async function (req, res) {
    try {
        const result = await sellersService.createSellerDetails(req.body);
        res.json({"status": true , "message": "Seller Created Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.sellersLogin = async function (req, res) {
    try {
        const result = await sellersService.sellersLogin(req.body);
        if (result.status != false) {
            res.json({ "status": true, "message": "User Login Successfully!", accessToken: result.accesstoken, refreshToken: result.refreshtoken });
        } else {
            res.json({ status: false, message: result.message })
        }
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}


module.exports.sellerDetails = async function (req, res) { 
    try {
        const result = await sellersService.sellerDetails(req.user);
        res.json({"status": true , "message": "Seller Fetched Successfully!" , data: result });
    } catch (e) {
        console.log(e);
    }
}