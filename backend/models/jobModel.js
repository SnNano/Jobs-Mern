const mongoose = require("mongoose");


const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    title:{
        type:String,
        required: [true, "please add a title"],
        minLength: 8,
        maxLength: 100
    },
    company:{
        type:String,
        required: [true, "please add the company name"],
        minLength: 4,
        maxLength: 100
    },
    b_desc:{
        type:String,
        required: [true, "please add a bried description"],
        minLength: 10,
        maxLength: 200
    },
    website:{
        type:String,
        minLength: 8,
        maxLength: 100
    },
    location:{
        type:String,
        required: [true, "please add a location"],
        minLength: 8,
        maxLength: 200
    },
    logo:{
        type:String,
        required: [true, "please add a logo"]
    },
    description:{
        type:String,
        required: [true, "please add a description"],
        minLength: 10
    }
}, {timestamps:true});

module.exports = mongoose.model("Job", jobSchema);
