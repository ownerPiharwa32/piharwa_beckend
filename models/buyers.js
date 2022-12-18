const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");


// const geoJson = new Schema({
//     _id: false,
//     type: {
//         type: String,
//         enum: ["Point"],
//     },
//     coordinates: {
//         type: [Number],
//     }
// });



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
    }
}, {
    timestamps: true,
})

buyersSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Buyers = mongoose.model("buyers", buyersSchema);
module.exports = Buyers;