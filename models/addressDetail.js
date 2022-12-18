const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");


const addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
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
    default: {
        type: Boolean,
        default: true
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
    }       
}, {
    timestamps: true,
})

addressSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Addresses = mongoose.model("addresses", addressSchema);
module.exports = Addresses;