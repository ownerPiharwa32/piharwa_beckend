
const uploadService = require('../services/upload-service')

module.exports.uploadProductImgs = async (req, res) => {
    try {
        const result = await uploadService.uploadProductImgs(req.files, req.params);
        res.json({"status": true , "message": "Product Image uploaded Successfully!" });
    }catch (e) {
        console.log(e)
    }
}


module.exports.removeProductImgs = async (req, res) => {
    try {
        const result = await uploadService.removeProductImgs(req.params);
        res.json({"status": true , "message": "Product Image Deleted Successfully!" });
    }catch (e) {
        console.log(e)
    } 
}
