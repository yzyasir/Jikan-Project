// 2)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "Must add a first name"],
        minlength: [2, "Your name must be at least 2 characters"]
    }, 
    lastName: {
        type: String,
        required: [true, "Must add a last name"],
        minlength: [2, "You last name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "You must enter an email"]
    },
    password: {
        type: String,
        required: [true, "You must enter a password"],
        minlength: [8, "Your password must be 8 characters or longer"]
    }
})