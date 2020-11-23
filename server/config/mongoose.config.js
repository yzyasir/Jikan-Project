// Steps 1)
const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost/users_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("It works bro!!!"))
  .catch(err => console.log("Oh no, it didnt work brother", err))