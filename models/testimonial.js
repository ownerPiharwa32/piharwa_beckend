const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");


const testimonialSchema = new Schema({
    fullname: {
        type: String,
    }, 
    position: {
        type: String,
    },
    rating: {
        type: String
    },
    description: {
        type: String
    },
    userProfileImg: {
        type: String
    }
}, {
    timestamps: true,
})

testimonialSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Testimonials = mongoose.model("testimonials", testimonialSchema);
module.exports = Testimonials;