const mongoose = require('mongoose');

const userDB = mongoose.Schema({
    username:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require:true
    }
})