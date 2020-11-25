// 3
// we are going to modify our data in this file, logic happens here

const User = require("../models/Users.model"); //we exported our models file thats why we are able to plug it in here

module.exports.createUser = (req, res) => { //dont need to export the whole file since we are exporting the individual commands
    User.create(req.body)
        .then(newUser => res.json({message: "Success, you made an account", user: newUser}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
// On createUser we created a new user with the data passed from the request via "request.body"
// Then we try to save it in db, if it does, we send back a success message, along with the user instance
// If not, error response
}

// The form page will call to our API in order to actually register the user in the db
// Hashing will occur at the "schema level" (meaning in our user models) so we will not have to worry about that here since it is done there
// All other validations occur in the models, but they CAN be done here
