
const categoryModel = require('../models/category')
const mainCategoryModel = require('../models/mainCat')
const { ObjectId } = require('mongodb');

module.exports.addMNCategoryDetails = async (reqBody) => {
    let result = await mainCategoryModel.create(reqBody)
    return result
}

module.exports.addCategoryDetails = async (reqBody) => {
    let result = await categoryModel.create(reqBody)
    return result
}

module.exports.allCategoriesList = async () => {
    let arr = []
    let mainCategories = await mainCategoryModel.find()
    let mnCatId1 = mainCategories[0]._id
    let mnCatId2 = mainCategories[1]._id
    let subCategories = await categoryModel.find({ "parentCategoryId": null })

    let piharwaCategories = subCategories.filter(obj => obj.rootCategory == mnCatId1.toString())
    piharwaCategories.forEach(obj => obj.value = 0)


    let elementCategories = subCategories.filter(obj => obj.rootCategory == mnCatId2.toString())
    elementCategories.forEach(obj => obj.value = 0)

    let finalObj = {
        piharwaCategories: piharwaCategories,
        elementCategories: elementCategories
    }
    return {
        status: true,
        message: "Categories List fetched Successfully",
        data: finalObj
    }
}


module.exports.getAllCategory = async (reqParams) => {
    try {
        const categories = await categoryModel.find({ rootCategory: ObjectId(reqParams.rootCatId) });
        if (!categories) return [];
        let result = await this.nestedCategories(categories);
        return result
    } catch (err) {
        console.log(err);
    }
}

module.exports.getMNCategoryDetails = async () => {
    try {
        let result = await mainCategoryModel.find();
        return result
    } catch (err) {
        console.log(err);
    }
}



module.exports.nestedCategories = async (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentCategoryId == null);
    } else {
        category = categories.filter(cat => String(cat.parentCategoryId) == String(parentId));
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: await this.nestedCategories(categories, cate._id)
        })
    }
    return categoryList;
}


module.exports.updateCategoryDetails = async (reqBody) => {
    let rootCatId = reqBody.rootCategory
    let categoryId = reqBody.categoryId
    let name = reqBody.name
    let slug = reqBody.slug
    let parentCategoryId = reqBody.parentCategoryId
    let result = await categoryModel.findOneAndUpdate({ "_id": categoryId },
        { $set: { rootCategory: ObjectId(rootCatId), name: name, slug: slug, parentCategoryId: parentCategoryId } })
    return result
}