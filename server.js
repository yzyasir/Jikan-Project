// 1-4
const express = require("express");
const app = express(); 
const port = 8000;
// ______________________________________________________________
const cors = require('cors'); 
app.use(cors());
// ______________________________________________________________
require("./server/config/mongoose.config");
// ______________________________________________________________
app.use(express.json(), express.urlencoded({extended: true}));
// ______________________________________________________________

// ______________________________________________________________
app.listen(port, ()=>console.log(`Developer is listening in on port : ${port}`));