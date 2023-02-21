const productService = require('./product-service')

module.exports.uploadProductImgs = async (file, reqParams) => {
    let filesArr = []
    for (let i = 0; i < file.length; i++) {
        let fileLocation = file[i].location;
        filesArr.push(fileLocation)
    }
    let result = await productService.updateImgForProduct(filesArr, reqParams)
    return result
}

module.exports.uploadFeaturedImgs = async (file, reqParams) => {
    let fileLocation = file[0].location;
    let result = await productService.uploadFeaturedImgs(fileLocation, reqParams)
    return result
}

module.exports.removeProductImgs = async (reqParams) => {
    let result = await productService.removeProductImgs(reqParams)
}