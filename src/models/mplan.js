// employeeModel.js

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer')

const masterplanSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },
    phonenumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    monthyear:{
        type:String,
        required:true
    }   
});


const Masterplan = mongoose.model('Masterplan', masterplanSchema);

module.exports = Masterplan;
