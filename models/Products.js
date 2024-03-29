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
    productSKU: {
        type: String,
    },
    SellerStoreID: {
        type: Schema.Types.ObjectId,
        ref: "sellers",
    },
    productDescription: {
        type: String,
    },
    rootCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "maincategories",
    },
    productCategoryID: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
    productCategoryName: {
        type: String,
    },
    featuredProduct: {
        type: Boolean,  
        default: false
    },
    homeDecorUtility: {
        type: Boolean,  
        default: false
    },
    homeDecorSeq: {
        type: Number,
    },
    price: {
        type: Number,
    },
    currency: {
        type: String, 
    },
    allowDiscount: {
        type: Boolean,
        default: false
    },
    discountPercentage: {
        type: Number,
    },
    discountPrice: {
        type: Number
    },
    productImg: {
        type: String,
    },
    thumbnailImgs: [],
    productDetails: [{
        quantity: {
            type: Number
        },
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
    },
    productStatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})



productSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Products = mongoose.model("products", productSchema);
module.exports = Products;