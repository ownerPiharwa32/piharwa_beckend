
const categoryService = require('../services/category-service')

module.exports.addMNCategoryDetails = async function (req, res) { 
    try {
        const result = await categoryService.addMNCategoryDetails(req.body);
        res.json({"status": true , "message": "Category Added Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

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
        const result = await categoryService.getAllCategory(req.params);
        res.json({"status": true , "message": "Fetch All Categories Successfully!" , data: result });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.getMNCategoryDetails = async function (req, res) {
    try {
        const result = await categoryService.getMNCategoryDetails();
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

module.exports.allCategoriesList = async function (req, res) { 
    try {
        const result = await categoryService.allCategoriesList();
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.getFeaturedCategories = async function (req, res) { 
    try {
        const result = await categoryService.getFeaturedCategories();
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}