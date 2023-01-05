const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const roles = constants.roles;
const { ObjectId } = require('mongodb');

const categorySchema = new Schema({
    rootCategory: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    parentCategoryId: {
        type: Schema.Types.ObjectId,
        default: null
    },
}, {
    timestamps: true,
})




const Categories = mongoose.model("categories", categorySchema);
module.exports = Categories;