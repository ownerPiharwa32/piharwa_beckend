const productService = require('./product-service')

module.exports.uploadProductImgs = async (file, reqParams) => {
    let fileLocation = file[0].location;
    let result = await productService.updateImgForProduct(fileLocation, reqParams)
    return result
}

module.exports.removeProductImgs = async (reqParams) => {
    let result = await productService.removeProductImgs(reqParams)
}