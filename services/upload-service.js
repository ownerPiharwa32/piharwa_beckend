module.exports.uploadProductImgs = async (file, reqParams) => {
    console.log(file,"rrrrrrrrrrrrr")
    let fileLocation = file[0].location;
    console.log(fileLocation,"rrrrrrrrrrrrr")
    return fileLocation
}