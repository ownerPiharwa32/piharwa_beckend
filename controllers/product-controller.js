
const productService = require('../services/product-service')

module.exports.addProductDetails = async function (req, res) { 
    try {
        const result = await productService.addProduct(req.body);
        res.json({"status": true , "message": "Product Added Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e});
    }
}

module.exports.updateProductDetails = async function (req, res) { 
    try {
        const result = await productService.updateProductDetails(req.body);
        res.json({"status": true , "message": "Product Updated Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}



module.exports.productListing = async function (req, res) { 
    try {
        const result = await productService.productListing();
        res.json({"status": true , "message": "Product Fetched Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.getSingleproduct = async function (req, res) { 
    try {
        const result = await productService.getSingleproduct(req.params);
        res.json({"status": true , "message": "Product Fetched Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}