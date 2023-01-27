const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const roles = constants.roles;
const { ObjectId } = require('mongodb');

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "productCart",
    },
    razorpayOrderId: {
        type: String,
    },
    paymentStatus: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    address_line_one: {
        type: String,
    },
    address_line_two: {
        type: String,
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    productDetails: [{
        productID: {
            type: Schema.Types.ObjectId,
            ref: "products",
        },
        SellerStoreID: {
            type: Schema.Types.ObjectId,
            ref: "sellers",
        },
        rootCategoryId: {
            type: Schema.Types.ObjectId,
            ref: "maincategories",
        },
        productCategoryID: {
            type: Schema.Types.ObjectId,
            ref: "categories",
        },
        quantity: {
            type: Number
        },
        sizes: {
            type: String,
        }
    }],
    trackingStatus: {
        type: String,
        enum: ['initiated', 'packaging', 'shipped', 'delivered', 'canceled'],
        default: 'initiated'
    }
}, {
    timestamps: true,
})



orderSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;