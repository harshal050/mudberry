require('dotenv').config()
const mongoose = require("mongoose");
const validator = require("validator");

const prebookSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },
    pnumber: {  
        type: Number,
        required: true,
    },  
    pdate: {
        type: Date,
        required: true,
    }
});



const Prebook = mongoose.model("Prebook", prebookSchema);
module.exports = Prebook;
