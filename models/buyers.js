const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");


const geoJson = new Schema({
    _id: false,
    type: {
        type: String,
        enum: ["Point"],
    },
    coordinates: {
        type: [Number],
    }
});



const buyersSchema = new Schema({
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
    homeAddress: {
        address_line_one: {
            type: String,
            default: "",
        },
        address_line_two: {
            type: String,
            default: "",
        },
        address_line_three: {
            type: String,
            default: "",
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
        loc: {
            type: geoJson,
        },        
    },
    otherAddress: {
        address_line_one: {
            type: String,
            default: "",
        },
        address_line_two: {
            type: String,
            default: "",
        },
        address_line_three: {
            type: String,
            default: "",
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
        loc: {
            type: geoJson,
        },        
    }
}, {
    timestamps: true,
})

buyersSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Buyers = mongoose.model("buyers", buyersSchema);
module.exports = Buyers;