const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "please add a name"],
        minLength: 4,
        maxLength: 60
    },
    email:{
        type:String,
        required: [true, "please add your email"],
        minLength: 4,
        maxLength: 190
    },
    password:{
        type:String,
        required: [true, "please add your password"],
        minLength: 10,
        maxLength: 200
    }
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);
