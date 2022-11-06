const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const constants = require('../constants/constants');
const bcrypt = require("bcrypt");
const roles = constants.roles;

const usersSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: [roles.sellers, roles.buyers, roles.admin, roles.customer_care]
    },
}, {
    timestamps: true,
})


usersSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

usersSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next();
    else {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }    
    next();
})



usersSchema.methods.correctPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const Users = mongoose.model("users", usersSchema);
module.exports = Users;