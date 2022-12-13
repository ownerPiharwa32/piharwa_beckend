const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const roles = constants.roles;
const { ObjectId } = require('mongodb');

const productCartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
    }, 
    quantity: {
        type: Number
    },
    sizes: {
        type: String,
    }
}, {
    timestamps: true,
})



productCartSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const ProductCart = mongoose.model("productCart", productCartSchema);
module.exports = ProductCart;