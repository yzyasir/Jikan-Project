// 3
// we are going to modify our data in this file, logic happens here

const User = require("../models/Users.model"); //we exported our models file thats why we are able to plug it in here

module.exports.register = (req, res) => { //dont need to export the whole file since we are exporting the individual commands
    User.create(req.body) //request and response OBJECT not cycle
// information is passed through the body through the way we did it, but you CAN pass it through the url if you so choose
        .then(newUser => res.json({message: "Success, you made an account", user: newUser}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
// On createUser we created a new user with the data passed from the request via "request.body"
// Then we try to save it in db, if it does, we send back a success message, along with the user instance
// If not, error response
}

module.exports.login = (req, res) => {
    console.log("Heres the req body", req.body.email)
    User.findOne({email: req.body.email})
        .then(user => {
            if(user == null){ // == means equal to, what we are doing here is checking if there is any email in the db that matches what comes through req.body
                res.status(400).json({message: "There is no email matching the one you entered, please try again"})
                res.cookie()
            } else{ //no need to add comparison since the if failed
                bcrypt.compare(req.body.password, user.password)
                    .then(isValid => {
                        if(isValid === true){
                            res.json({ msg: "Success, you logged in"});
                        }
                        else{
                            console.log("Blah I hit the else statement")
                            res.status(400).json({message: "Invalid login attempt"})
                        }
                    })
                    .catch(err  => {
                        console.log(err)
                        res.status(400).json({message: "Invalid login attempt"})})
            }
        })
        .catch(err => {
            res.status(400).json(err.errors)
        }); 
}

// The form page will call to our API in order to actually register the user in the db
// Hashing will occur at the "schema level" (meaning in our user models) so we will not have to worry about that here since it is done there
// All other validations occur in the models, but they CAN be done here

module.exports.findAllUsers = (req, res) => {
    User.find(req.body)
        .then(allUsers => res.json({message: "Success, we found all users", user: allUsers}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

// Module.exports are the instruction that tells node.js which bit of code (functions, objects, strings, etc) to "export" from a given file so other files are allowed access to the export code.
module.exports.findOneUser = (req, res) => { //basically we are exporting this function named findOneUser

    User.findOne({email: req.params.id}) //since we are finding it by id we include it here // id can go through params because it is a path parameter in our routes 
    .then(user => {
        if(user == null){ // == means equal to, what we are doing here is checking if there is any email in the db that matches what comes through req.body
            res.status(400).json({message: "There is no email matching the one you entered, please try again"})
            res.cookie()
        } else{ //no need to add comparison since the if failed
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(isValid === true){
                        res.json({ msg: "Success, you logged in"});
                    }
                    else{
                        console.log("Blah I hit the else statement")
                        res.status(400).json({message: "Invalid login attempt"})
                    }
                })
                .catch(err  => {
                    console.log(err)
                    res.status(400).json({message: "Invalid login attempt"})})
        }
    })
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

// __________________________________________________________________________________
module.exports.deleteOneUser = (req, res) => {
    User.remove({_id: req.params.id})
        .then(res.json({message: "Success, you deleted a user"}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

module.exports.updateUser = (req, res) => {
    User.update({_id: req.params.id}, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
    }, {runValidators: true})
            .then(updatedUser => res.json({user: updatedUser}))
            .catch(err => res.json({message: "Yasir the update did not work", error: err}))
}