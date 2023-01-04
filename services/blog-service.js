const blogModel = require('../models/blogs')
const { ObjectId } = require('mongodb');

module.exports.createBlogDetails = async (reqUser, reqBody) => {
    reqBody.user_id = ObjectId(reqUser.user_id)
    let result = await blogModel.create(reqBody)
    return {
        status: true,
        message: 'Blog Created Successfully',
        data: result
    }
}

module.exports.getBlogList = async () => {
    let result = await blogModel.find()
    return {
        status: true,
        message: 'Blogs Fetched Successfully',
        data: result
    }
}

module.exports.getSingleblog = async (reqParams) => {
    let result = await blogModel.findOne({ _id: reqParams.id })
    return {
        status: true,
        message: 'Blog Fetched Successfully',
        data: result
    }
}