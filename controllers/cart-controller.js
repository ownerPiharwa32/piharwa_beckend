
const productCartService = require('../services/cart-service')

module.exports.addProductInCart = async function (req, res) { 
    try {
        const result = await productCartService.addProductInCart(req.user, req.body);
        res.status(200).json({"status": result.status , "message": result.message });
    } catch (e) {
        res.status(400).json({"status": false , "message": e});
    }
}

module.exports.cartListing = async function (req, res) {
    try {
        const result = await productCartService.cartListing(req.user, req.body);
        res.status(200).json({"status": true , "message": "Product Cart Fetch Successfully!" , data: result });
    } catch (e) {
        res.status(400).json({"status": false , "message": e});
    }
}