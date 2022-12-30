const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const roles = constants.roles;
const { ObjectId } = require('mongodb');

const rootcatSchema = new Schema({
    categoryTitle: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
}, {
    timestamps: true,
})


const MnCategories = mongoose.model("maincategories", rootcatSchema);
module.exports = MnCategories;