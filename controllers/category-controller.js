
const categoryService = require('../services/category-service')

module.exports.addCategoryDetails = async function (req, res) { 
    try {
        const result = await categoryService.addCategoryDetails(req.body);
        res.json({"status": true , "message": "Category Added Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.getCategoryDetails = async function (req, res) {
    try {
        const result = await categoryService.getAllCategory();
        res.json({"status": true , "message": "Fetch All Categories Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}


module.exports.updateCategoryDetails = async function (req, res) { 
    try {
        const result = await categoryService.updateCategoryDetails(req.body);
        res.json({"status": true , "message": "Category Updated Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}