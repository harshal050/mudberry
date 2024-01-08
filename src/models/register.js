// employeeModel.js

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer')

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
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
    gender: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


employeeSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  // Generate JWT token method
  employeeSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, 'mynameisharshalhareshbhaimalaviyafromjasdan');
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  };

const Register = mongoose.model('Register', employeeSchema);

module.exports = Register;
