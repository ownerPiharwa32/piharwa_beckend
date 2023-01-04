const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const productModel = require('../models/Products')
const { ObjectId } = require('mongodb');

module.exports.addProduct = async (reqUser, reqBody) => {
    let user_id = reqUser.user_id
    let sellerDetails = await sellerModel.findOne({ user_id: user_id }, { storeName: 1 })
    let allowDiscount = reqBody.allowDiscount
    reqBody.SellerStoreID = sellerDetails._id
    if (allowDiscount == true) {
        let discountVal = ((reqBody.discountPercentage * reqBody.price)/100).toFixed(2)
        reqBody.discountPrice = (reqBody.price - discountVal).toFixed(2)
    } 
    let result = await productModel.create(reqBody)
    return result  
}

module.exports.updateProductDetails = async (reqBody) => { 
    try {
        let result = await productModel.findOneAndUpdate({ _id: ObjectId(reqBody.productId)}, { $set: reqBody })
        return result;
    } catch (e) {
        console.log(e)
    }
   
}



module.exports.productListing = async (reqBody) => { 
    const page = reqBody.page_no * 1 || 1;
    const limit = reqBody.no_record * 1 || 10;
    const skip = (page - 1) * limit;
    const rootCategoryId = reqBody.rootCatId
    const categoryId = reqBody.productCategoryID
    const searchText = reqBody.searchText
    let reqObj
    let searchObj;

  
    if (categoryId == '' && searchText == '') {
        reqObj = {
            $match: {
                productStatus: true,
                rootCategoryId: ObjectId(rootCategoryId)
            }
        }
        searchObj = {
            $match: {}
        }
    }
    else if (categoryId) {
        reqObj = {
            $match: {
                rootCategoryId: ObjectId(rootCategoryId),
                productCategoryID: ObjectId(categoryId),
                productStatus: true
            }
        }
        searchObj = {
            $match: {}
        }
    }
    else if (searchText) {
        reqObj = {
            $match: {
                rootCategoryId: ObjectId(rootCategoryId),
                productStatus: true
            }
        }
        searchObj = {
            $match: {
                $or: [{
                    productTitle: {
                        $regex: searchText,
                        $options: "$ig"
                    },
                },
                {
                    productCategoryName: {
                        $regex: searchText,
                        $options: "$ig"
                    }
                }]
            },
        }
    }
    else if (categoryId != '' && searchText != '') { 
        reqObj = {
            $match: {
                rootCategoryId: ObjectId(rootCategoryId),
                productCategoryID: ObjectId(categoryId),
                productStatus: true
            }
        }

        searchObj = {
            $match: {
                $or: [{
                    productTitle: {
                        $regex: searchText,
                        $options: "$ig"
                    },
                }]
            },
        }
    }




    let productDetails = await productModel.aggregate([
        reqObj,
        {
                
               $lookup: {
                    from: "sellers",
                    localField: "SellerStoreID",
                    foreignField: "_id",
                    as: "sellerShopName"
                }},
                 {
                $unwind: "$sellerShopName"
            },
            {
            $lookup: {
                    from: "categories",
                    localField: "productCategoryID",
                    foreignField: "_id",
                    as: "categoryProducts"
                }},
                 {
                $unwind: "$categoryProducts"
            },
            
            
            
                {
                     $project: {
                         productTitle: 1,
                         SellerShopName: "$sellerShopName.storeName",
                         productCategoryID: 1,
                         productCategoryName: "$categoryProducts.categoryTitle",
                         price: 1,
                         currency: 1,
                         productImg: { $arrayElemAt: [ "$thumbnailImgs", 0 ] },
                         productRating: 1,
                         OverallRating: 1,
                         createdAt: 1,
                         updatedAt: 1
                         },
                    
        },
        searchObj
                
                ])


    const paginatedItems = productDetails.slice(skip).slice(0, limit);
    const total = productDetails.length
    const total_pages = Math.ceil(total / limit)
    return {
        status: true,
        message: "List Fetched Successfully!",
        data: {
            per_page: limit,
            total: total,
            total_pages: total_pages,
            productList: paginatedItems
        }
    }
}

module.exports.getSingleproduct = async (reqParams) => {
    let result = await productModel.findOne({ _id: reqParams.id })
    result.productImg = result.thumbnailImgs[0]
    return result
}


module.exports.updateImgForProduct = async (fileLocation, reqParams) => {
    let imgObj;
    let result

    if (reqParams.default == 'false') {
        result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
            $push: {
                thumbnailImgs: fileLocation
            }
        })
    } else {
        result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        
            $push: {
                thumbnailImgs: fileLocation
            },
            $set:  {
                productImg : fileLocation
            },
        })
    } 

    return result
}


module.exports.removeProductImgs = async (reqParams) => { 
    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $pull: {
            product_imgs: {_id: reqParams.productImgId}
        } })
    return result
}   


module.exports.addFeaturedProduct = async (reqBody) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqBody.productId }, {
        $set:  {
            featuredProduct : reqBody.featuredProduct
        },
    })

    return result;

}


module.exports.getFeaturedProduct = async () => {
    try {
        let productArr = []
        let fProduct = await productModel.find({ featuredProduct: true, productStatus: true }, { "thumbnailImgs": { $slice: 1 }, 'thumbnailImgs[0]': 1, productTitle: 1 }).limit(6)
        for (let i = 0; i < fProduct.length; i++) {
            const fProducts = fProduct[i];
            let productObj = {
                id: fProducts._id,
                productTitle: fProducts.productTitle,
                productImg: fProducts.thumbnailImgs[0]
            }
            productArr.push(productObj)
        }
        return {
            status: true,
            message: "Featured Products Fecthed Successfully",
            data: productArr
          }
            
    } catch (e) {
        return { "status": false, "message": "There is no featured Products are selected" }
    }

}


module.exports.getLatestProduct = async () => {
    let productArr = []
    let lProduct = await productModel.find({ productStatus: true }, { "thumbnailImgs": { $slice: 1 }, 'thumbnailImgs[0]': 1, productTitle: 1 }).sort( { "createdAt": -1 } )
        .limit(4)
    
    for (let i = 0; i < lProduct.length; i++) {
        const lProducts = lProduct[i];
        let productObj = {
            id: lProducts._id,
            productTitle: lProducts.productTitle,
            productImg: lProducts.thumbnailImgs[0]
        }
        productArr.push(productObj)
    }
    return {
        status: true,
        message: "Latest Products Fetched Successfully",
        data: productArr
      }
}



module.exports.deleteProduct = async (reqUser, reqParams) => {
    await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $set: {
            productStatus: false
        }
    })
    return {
        status: true,
        message: "Product Deleted Successfully!",
    }
}