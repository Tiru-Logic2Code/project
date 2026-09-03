const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');
const app = express();

mongoose.connect("").then(()=>console.log("database connected")).catch((err)=> console.log(err.message))

app.listen(3000, ()=> console.log("server is running....."))
