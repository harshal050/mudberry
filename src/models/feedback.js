require('dotenv').config()
const mongoose = require("mongoose");
const validator = require("validator");

const feedbackSchema = new mongoose.Schema({
    yourname: {
        type: String,
        required: true,
    },
    youremail: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    yoursubject: {
        type: String,
        required: true,
    },
    yourmessage: {
        type: String,
        required: true,
    }
});



const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
