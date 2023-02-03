
const userModel = require('../models/users')
const testimonialModel = require('../models/testimonial')
const { ObjectId } = require('mongodb');

module.exports.addTestimonialDetails = async function (reqUser, reqBody) {
    let result = await testimonialModel.create(reqBody)
    return {
        status: true,
        message: "Testimonial Created successfully!",
        data: result 
    }
}

module.exports.listTestimonialDetails = async function () {
    let result = await testimonialModel.find().limit(3).sort( { "createdAt": -1 } )
    return {
        status: true,
        message: "Testimonial fetched successfully!",
        data: result 
    }
}

module.exports.updateTestimonialDetails = async function (reqUser, reqBody) {
    await testimonialModel.findOneAndUpdate({_id: ObjectId(reqBody.testimonialId) }, {$set: { fullname: reqBody.fullname, position: reqBody.position, rating: reqBody.rating, description: reqBody.description }})
    return {
        status: true,
        message: "Testimonial Updated successfully!",
    };
}