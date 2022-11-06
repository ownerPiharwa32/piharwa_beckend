
const categoryModel = require('../models/category')

module.exports.addCategoryDetails = async (reqBody) => {
    let result = await categoryModel.create(reqBody)
    return result
}



module.exports.getAllCategory = async () => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) return [];
        let result = await this.nestedCategories(categories);
        return result
    } catch (err) {
        console.log(err);
    }
}



module.exports.nestedCategories = async(categories, parentId = null) => {
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
            categoryTitle: cate.categoryTitle,
            slug: cate.slug,
            children: await this.nestedCategories(categories, cate._id)
        })
    }
    return categoryList;
}


module.exports.updateCategoryDetails = async (reqBody) => { 
    let categoryId = reqBody.categoryId
    let categoryTitle = reqBody.categoryTitle
    let slug = reqBody.slug
    let parentCategoryId = reqBody.parentCategoryId
    let result = await categoryModel.findOneAndUpdate({"_id" : categoryId },
        { $set: { categoryTitle: categoryTitle, slug: slug, parentCategoryId: parentCategoryId } })
    return result
}