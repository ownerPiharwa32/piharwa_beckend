const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const otpTokenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        unique: true
    },
    emailId:{
        type:String,
    },
    
    otpToken: {
        type:String,
    },
    otpVerificationTime: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean, 
        default: false  
    },
}, {
    timestamps: true,
});
    
otpTokenSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

const otpToken = mongoose.model("otpTokens", otpTokenSchema);
module.exports = otpToken;