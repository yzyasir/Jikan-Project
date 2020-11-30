const UserController = require("../controllers/Users.controller");

module.exports = app => {
    app.post("/api/new/user", UserController.createUser); //called on the method from the controllers
    app.get("/api/find/all/users", UserController.findAllUsers);
    app.get("/api/find/one/user/:id", UserController.findOneUser);
    app.delete("/api/delete/User/:id", UserController.deleteOneUser);
    app.put("/api/update/user/:id", UserController.updateUser);
}

 