require('dotenv').config()
const mongoose = require("mongoose");
const validator = require("validator");

const subscriberSchema = new mongoose.Schema({
    subemail: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
        
    },
});


const Subscribe = mongoose.model("subscriber", subscriberSchema);
module.exports = Subscribe;
