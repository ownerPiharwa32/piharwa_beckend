
const buyerService = require('../services/buyer-service')


module.exports.buyersRegistration = async function (req, res) {
    try {
        const result = await buyerService.buyersRegistration(req.body);
        res.json({"status": true , "message": "Buyer Created Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.buyersLogin = async () => {
    try {
        const result = await buyerService.buyersLogin(req.body);
        if (result.status != false) {
            res.json({ "status": true, "message": "Buyer Login Successfully!", accessToken: result.accesstoken, refreshToken: result.refreshtoken });
        } else {
            res.json({ status: false, message: result.message })
        }
    } catch (e) {
        console.log(e)
        res.json({"status": false , "message": e});
    }
}