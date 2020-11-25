// 2)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// It is recommended to use bcypt "asynchronously", so we use with a promise
// 10 is the number of "salt rounds" Bcyrpt will use when generating a salt (look it up).
// Next is the function we will use once the promise if fulfilled

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
        required: [true, "You must enter an email"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
            // We added a custom validator called validate into our schema the same way we have required/minlength
            // We provide it an object that basically containes a validator function (something that will return boolean)
            // this is basically regex all over again
        }
    },
    password: {
        type: String,
        required: [true, "You must enter a password"],
        minlength: [8, "Your password must be 8 characters or longer"]
    }
}, {timestamps: true}); 

// My UserSchema doesnt contain a field for confirmPassword (since we didnt want to save it to our db),
// we use this to add in a touch of code to compare password entries
// We can make use of "mongoose virtuals" for things we dont want to save in mongoDB
UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value )

// Next we need to make use of some middleware to add in another validation. 
// We we will be using the "pre hook" and having it run before validations.
// Note: Avoid rewriting the callback function using an arrow function as it will not have the correct scope for "this"
UserSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
}
// Next is a common feature in middleware.
// When our middleware has done its job, we need to call this to have the next middleware or function (in this case validations) run
next();
});

const User = mongoose.model("User", UserSchema); 
UserSchema.pre('save', function(next) {
    // We do not want our passwords saved in actual text, Bcrypt is a popular library for hashing passwords.
    // Installed using "npm i bcypt"
        bcrypt.hash(this.password, 10)
          .then(hash => {
            this.password = hash;
            next();
          });
      });

module.exports = User; 