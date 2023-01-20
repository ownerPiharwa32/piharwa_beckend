
const testimonialService = require('../services/testimonial-service')
module.exports.addTestimonialDetails = async function (req, res) {
    try {
        const result = await testimonialService.addTestimonialDetails(req.user, req.body);
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.listTestimonialDetails = async function (req, res) {
    try {
        const result = await testimonialService.listTestimonialDetails();
        res.json({"status": result.status , "message": result.message , data: result.data });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}

module.exports.updateTestimonialDetails = async function (req, res) {
    try {
        const result = await testimonialService.updateTestimonialDetails(req.user, req.body);
        res.json({"status": result.status , "message": result.message });
    } catch (e) {
        res.json({"status": false , "message": e.errors});
    }
}