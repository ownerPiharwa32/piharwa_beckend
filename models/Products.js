const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const roles = constants.roles;
const { ObjectId } = require('mongodb');

const productSchema = new Schema({
    productTitle: {
        type: String,
    },
    SellerStoreID: {
        type: Schema.Types.ObjectId,
        ref: "sellers",
        unique: true
    },
    sellerStoreName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productCategoryID: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
    productCategoryName: {
        type: String,
    },
    price: {
        type: Number,
    },
    currency: {
        type: String, 
    },
    discountPrice: {
        type: Number
    },
    product_imgs: [],
    productDetails: [{
        sizes: {
            type: String,
        }, 
        stockAvailability: {
            type: Boolean,
        }
    }],
    productRating: {
        type: Number,
    },
    OverallRating: {
        type: Number
    }
}, {
    timestamps: true,
})



productSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Products = mongoose.model("products", productSchema);
module.exports = Products;