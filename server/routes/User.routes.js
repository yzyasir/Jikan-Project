const UserController = require("../controllers/Users.controller");
const User = require("../models/Users.model");

module.exports = app => {
    app.post("/api/new/user", UserController.createUser) //called on the method from the controllers
}