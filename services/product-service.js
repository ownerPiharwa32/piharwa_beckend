const sellerModel = require('../models/sellers')
const userModel = require('../models/users')
const productModel = require('../models/Products')
const categoryModel = require('../models/category')
const mainCategoryModel = require('../models/mainCat')
const { ObjectId } = require('mongodb');

module.exports.addProduct = async (reqUser, reqBody) => {
    let user_id = reqUser.user_id
    let sellerDetails = await sellerModel.findOne({ user_id: user_id }, { storeName: 1 })
    let allowDiscount = reqBody.allowDiscount
    reqBody.SellerStoreID = sellerDetails._id
    if (allowDiscount == true) {
        let discountVal = ((reqBody.discountPercentage * reqBody.price) / 100).toFixed(2)
        reqBody.discountPrice = (reqBody.price - discountVal).toFixed(2)
    }
    let result = await productModel.create(reqBody)
    return result
}

module.exports.updateProductDetails = async (reqBody) => {
    try {
        let result = await productModel.findOneAndUpdate({ _id: ObjectId(reqBody.productId) }, { $set: reqBody })
        return result;
    } catch (e) {
        console.log(e)
    }

}



// module.exports.productListing = async (reqBody) => {
//     const page = reqBody.page_no * 1 || 1;
//     const limit = reqBody.no_record * 1 || 10;
//     const skip = (page - 1) * limit;
//     const rootCategoryId = reqBody.rootCatId
//     const categoryId = reqBody.productCategoryID
//     const searchText = reqBody.searchText
//     let productSort = reqBody.productSort;
//     let sortvalue = { createdAt: -1 }
//     let reqObj
//     let searchObj;
//     let lookupVar= '_id';

//     if (categoryId == '' && searchText == '') {
//         reqObj = {}
//         searchObj = {
//             $match: {}
//         }
//     }
//     else if (categoryId) {
//         let productIDs = await categoryModel.findOne({ _id: ObjectId(categoryId) })
//         if (productIDs.parentCategoryId != null) {
//             lookupVar = 'parentCategoryId'
//         }

//         reqObj = {
//             "$or": [
//                 { "parentCategoryId": ObjectId(categoryId) },
//                 { "_id": ObjectId(categoryId) },
//             ]
//         }

//         searchObj = {
//             $match: {}
//         }
//     }
//     else if (searchText) {
//         reqObj = {}
//         searchObj = {
//             $match: {
//                 $or: [{
//                     productTitle: {
//                         $regex: searchText,
//                         $options: "$ig"
//                     },
//                 },
//                 {
//                     productCategoryName: {
//                         $regex: searchText,
//                         $options: "$ig"
//                     }
//                 }]
//             },
//         }
//     }
//     else if (categoryId != '' && searchText != '') {
//         let productIDs = await categoryModel.findOne({ _id: ObjectId(categoryId) })
//         if (productIDs.parentCategoryId != null) {
//             lookupVar = 'parentCategoryId'
//         }

//         reqObj = {
//             "$or": [
//                 { "parentCategoryId": ObjectId(categoryId) },
//                 { "_id": ObjectId(categoryId) },
//             ]
//         }

//         searchObj = {
//             $match: {
//                 $or: [{
//                     productTitle: {
//                         $regex: searchText,
//                         $options: "$ig"
//                     },
//                 }]
//             },
//         }
//     }

//     if (productSort != 0) {
//         sortvalue = { price: parseInt(productSort)}
//     }


//     let productDetails = await categoryModel.aggregate([

//         {
//             $match: reqObj
//         },
//         {
//             $lookup: {
//                 from: 'categories',
//                 localField: lookupVar,
//                 foreignField: 'parentCategoryId',
//                 as: 'parentsHierarchy'
//             }
//         },
//         {
//             $unwind: "$parentsHierarchy"
//         },
//         {
//             $lookup: {
//                 from: "products",
//                 localField: "parentsHierarchy._id",
//                 foreignField: "productCategoryID",
//                 as: "productData"
//             }
//         },
//         {
//             $unwind: "$productData"
//         },
//         {
//             $match: {
//                 "productData.productStatus": true,
//                 "productData.rootCategoryId": ObjectId(rootCategoryId)
//             }
//         },
//         {

//             $lookup: {
//                 from: "sellers",
//                 localField: "productData.SellerStoreID",
//                 foreignField: "_id",
//                 as: "sellerShopName"
//             }
//         },
//         {
//             $unwind: "$sellerShopName"
//         },
//         {
//             $project: {
//                 _id: "$productData._id",
//                 productTitle: "$productData.productTitle",
//                 productCategoryID: "$productData.productCategoryID",
//                 price: "$productData.price",
//                 currency: "$productData.currency",
//                 // productImg: { $arrayElemAt: ["$productData.thumbnailImgs", 0] },
//                 productImg: "$productData.productImg",
//                 productRating: "$productData.productRating",
//                 OverallRating: "$productData.OverallRating",
//                 createdAt: "$productData.createdAt",
//                 updatedAt: "$productData.updatedAt",
//                 SellerShopName: "$sellerShopName.storeName",
//                 productCategoryName: "$name"
//             },

//         },
//         searchObj
//     ]).sort(sortvalue)

//     const paginatedItems = productDetails.slice(skip).slice(0, limit);
//     const total = productDetails.length
//     const total_pages = Math.ceil(total / limit)
//     return {
//         status: true,
//         message: "List Fetched Successfully!",
//         data: {
//             per_page: limit,
//             total: total,
//             total_pages: total_pages,
//             productList: paginatedItems
//         }
//     }
// }

module.exports.productListing = async (reqBody) => {
    const page = reqBody.page_no * 1 || 1;
    const limit = reqBody.no_record * 1 || 10;
    const skip = (page - 1) * limit;
    const rootCategoryId = reqBody.rootCatId
    const categoryId = reqBody.productCategoryID
    const searchText = reqBody.searchText;
    let productSort = reqBody.productSort;
    let sortvalue = { createdAt: -1 }
    let reqObj;
    if (categoryId == '') {
        // console.log("111111111111111111111")
        reqObj = {
            "rootCategoryId": ObjectId(rootCategoryId),
            "productStatus": true
        }
    } else if (categoryId != '') {
        // console.log("22222222222222222222222222")
        // console.log(categoryId, "================categorId")
        let allcategories = await categoryModel.aggregate([
            {
                $match: { "_id": ObjectId(categoryId) }
            },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentCategoryId",
                    maxDepth: 2,
                    as: "reportingHierarchy"
                }
            },
            {
                $project: {
                    "name": 1,
                    "categories": "$reportingHierarchy._id"
                }
            }
        ])


        // console.log(allcategories[0].categories, "pppppppppppppppppppppppppppppppppppp")
        let catDetails = allcategories[0].categories;
        if (catDetails.length > 0) {
            reqObj = {
                "rootCategoryId": ObjectId(rootCategoryId),
                "productStatus": true,
                "productCategoryID": { $in: catDetails }
            }
        } else {
            reqObj = {
                "rootCategoryId": ObjectId(rootCategoryId),
                "productStatus": true,
                "productCategoryID": ObjectId(categoryId)
            }
        }
    }

    if (productSort != 0) {
        sortvalue = { price: parseInt(productSort) }
    }

    let productDetails = await productModel.aggregate([
        {
            $match: reqObj
        },
        {
            $project: {
                _id: 1,
                productTitle: 1,
                productCategoryID: 1,
                price: 1,
                currency: 1,
                productImg: 1,
                productRating: 1,
                OverallRating: 1,
                createdAt: 1,
                updatedAt: 1
            },
        },
        {
            $match: {
                productTitle: {
                    $regex: searchText,
                    $options: "i"
                }
            }
        }
    ]).sort(sortvalue)

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
    return result
}


module.exports.updateImgForProduct = async (fileLocation, reqParams) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $set: {
            thumbnailImgs: fileLocation
        }
    })
    return result
}

module.exports.uploadFeaturedImgs = async (fileLocation, reqParams) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $set: {
            productImg: fileLocation
        }
    })
    return result
}




module.exports.removeProductImgs = async (reqParams) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqParams.productId }, {
        $pull: {
            product_imgs: { _id: reqParams.productImgId }
        }
    })
    return result
}


module.exports.addFeaturedProduct = async (reqBody) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqBody.productId }, {
        $set: {
            featuredProduct: reqBody.featuredProduct
        },
    })

    return result;

}

module.exports.addHomeDecorProduct = async (reqBody) => {
    let result = await productModel.findByIdAndUpdate({ _id: reqBody.productId }, {
        $set: {
            homeDecorUtility: reqBody.homeDecorUtility,
            homeDecorSeq: reqBody.homeDecorSeq
        },
    })

    return result;

}


module.exports.getFeaturedProduct = async () => {
    try {
        let fProduct = await productModel.find({ featuredProduct: true, productStatus: true }, { productImg: 1, productTitle: 1 }).limit(6)
        return {
            status: true,
            message: "Featured Products Fecthed Successfully",
            data: fProduct
        }

    } catch (e) {
        return { "status": false, "message": "There is no featured Products are selected" }
    }

}


module.exports.getHomeDecorProduct = async () => {
    try {
        let fProduct = await productModel.find({ homeDecorUtility: true, productStatus: true }, { productImg: 1, productTitle: 1, homeDecorSeq: 1 }).limit(4).sort({homeDecorSeq : 1})
        return {
            status: true,
            message: "Featured Products Fecthed Successfully",
            data: fProduct
        }

    } catch (e) {
        return { "status": false, "message": "There is no featured Products are selected" }
    }

}




module.exports.getLatestProduct = async () => {
    let lProduct = await productModel.find({ productStatus: true }, { productImg: 1, productTitle: 1 }).sort({ "createdAt": -1 })
        .limit(4)

    return {
        status: true,
        message: "Latest Products Fetched Successfully",
        data: lProduct
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