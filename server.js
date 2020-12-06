// 1-4
const express = require("express");
const app = express(); 
const port = 8000;
// ______________________________________________________________
const cors = require('cors'); 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// The credentials: true basically says we are going to create a web token and send it to the browser, and whatever api call we make, we have to send that web token back, a little added peice tp our axios call
// ______________________________________________________________
require("./server/config/mongoose.config"); 
// This is only added after you made your mongoos.config.js file in order to connect
// ______________________________________________________________
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// Can also be written as such, combining them
app.use(express.json(), express.urlencoded({extended: true}));
// The express.json allows us to read json, while the express.urlencoded allows us to read strings and arrays coming in
// ______________________________________________________________
const AllUserRoutes = require("./server/routes/User.routes");
AllUserRoutes(app);
// ______________________________________________________________
const AllReviewRoutes = require("./server/routes/Review.routes")
AllReviewRoutes(app);
// ______________________________________________________________
app.listen(port, ()=>console.log(`Developer is listening in on port : ${port}`));
// ______________________________________________________________
// Json Web tokens (JSTs) are a structured way to keep data secure and to make sure that data has not been tampered with in the res req cycle
// 3 parts of JSTs, header, body, signature. Body is where we store the info we want
// const jwt = require("jsonwebtoken"); //THIS ALL GOES IN HERE RIGHT?
// const payload = {
//     id: user._id
// };
// notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);
// Now that we have created a JWT that we can send with our responses. The way we will do this is with a cookie.
// _____________________________________________________________
// Cookie parser allows us to send cookies to our frontend, it also allows us to read cookies on the request
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// res.cookie("mycookie", "mydata", { httpOnly: true }).json({
//     message: "This response has a cookie"
//   });
// ______________________________________________________________
// This right here will config our .env (which is going to be a file alongside our server,js)
require('dotenv').config //here we required the dotenv library and invoke its config function