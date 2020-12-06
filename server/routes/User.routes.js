const UserController = require("../controllers/Users.controller");
const { authenticate } = require('../config/jwt.config'); //this right here is the middleware

module.exports = app => {
    app.post("/api/new/user", UserController.register); //called on the method from the controllers
    app.post("api/login", UserController.login);
    app.get("/api/logout", authenticate, UserController.logout)
// authenticate to prevent hackers from accessing our db
    app.get("/api/find/all/users", authenticate, UserController.findAllUsers); 
    app.get("/api/find/one/user/:id", UserController.findOneUser);
    app.delete("/api/delete/User/:id", UserController.deleteOneUser);
    app.put("/api/update/user/:id", UserController.updateUser);
}

 