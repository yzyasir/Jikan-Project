// 1-4
const express = require("express");
const app = express(); 
const port = 8000;
// ______________________________________________________________
require('dotenv').config //here we required the dotenv library and invoke its config function
// ______________________________________________________________
const cors = require('cors'); 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// ______________________________________________________________
require("./server/config/mongoose.config");
// ______________________________________________________________
app.use(express.json(), express.urlencoded({extended: true}));
// ______________________________________________________________
const AllUserRoutes = require("./server/routes/User.routes");
AllUserRoutes(app);
// ______________________________________________________________
app.listen(port, ()=>console.log(`Developer is listening in on port : ${port}`));
// ______________________________________________________________
// Json Web tokens (JSTs) are a structured way to keep data secure and to make sure that data has not been tampered with in the res req cycle
// 3 parts of JSTs, header, body, signature. Body is where we store the info we want
const jwt = require("jsonwebtoken"); //THIS ALL GOES IN HERE RIGHT?
const payload = {
    id: user._id
};
// notice that we're using the SECRET_KEY from our .env file
const userToken = jwt.sign(payload, process.env.SECRET_KEY);
// Now that we have created a JWT that we can send with our responses. The way we will do this is with a cookie.
// _____________________________________________________________
const cookieParser = require('cookie-parser');
app.use(cookieParser());
res.cookie("mycookie", "mydata", { httpOnly: true }).json({
    message: "This response has a cookie"
  });