// He we have written our own middleware
const jwt = require("jsonwebtoken");

// The "authenticate" function takes a few args, the req/res we have seen, next (its purpose is to "move onto our next thing", you'' see in the routes)
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.FIRST_SECRET_KEY, (err, payload) => { //cookie gets stored in req.cookies
// function checks the "usertoken" cookie that should be present inside of the "cookies" object of request with the secret we used when signing it. 
    console.log("These are the cookies", req.cookies);
    if (err) { 
      res.status(401).json({verified: false});
// Here we added a callback function that recieved errors and a payload(info stored inside cookie)
// if there are any errors, we reply with 401 status code (unauthorized), and pass back an object signifying the user attempting to access the route is not authenticated
    } else {
      next();
    }
  });
}