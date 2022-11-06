const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        unique: true
    },
    accessToken:{
        type:String,
    },
    refreshtoken: {
        type:String,
    },
    lastActive: Date,
}, {
    timestamps: true,
});
    
tokenSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const Token = mongoose.model("tokens", tokenSchema);
module.exports = Token;