const blogService = require('../services/blog-service')

module.exports.createBlogDetails = async function (req, res) { 
    try {
        const result = await blogService.createBlogDetails(req.user, req.body);
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.getBlogList = async function (req, res) { 
    try {
        const result = await blogService.getBlogList();
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.getSingleblog = async function (req, res) { 
    try {
        const result = await blogService.getSingleblog(req.params);
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}
