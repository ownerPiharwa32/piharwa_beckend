const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        unique: true
    },
    blogTitle: {
        type:String,
    },
    featured_img: {
        type: String,  
    },
    featured_content: {
        type: String,
    },
    blogDescription: {
        type:String,
    },
    blogImages: [],
}, {
    timestamps: true,
});
    
blogSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const blogToken = mongoose.model("blogs", blogSchema);
module.exports = blogToken;