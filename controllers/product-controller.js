
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
        const result = await productService.productListing(req.body);
        res.json({"status": result.status , "message": result.message , data: result.data });
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


module.exports.addFeaturedProduct = async (req, res) => {
    try {
        const result = await productService.addFeaturedProduct(req.body);
        res.json({"status": true , "message": "Product Updated Successfully!" });
    } catch (e) {
        res.json({"status": false , "message": e});
    }
}


module.exports.getFeaturedProduct = async function (req, res) { 
    try {
      
        const result = await productService.getFeaturedProduct();
        res.json({"status": result.status , "message": result.message , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}
