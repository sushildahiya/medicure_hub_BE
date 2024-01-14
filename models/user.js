const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    mobile_no:{
        type: Number,
        required:true
    },
    password:{
            type: String,
            required: true
    },
    health_data:{
        type: Boolean,
        default: false
    },
    health_data_detail:{
        blood_group:{
            type:String,
            Enumerator:['O+','O-','A+','A-','B-','B+','AB+','AB-'],
            required:false
        },
        age:{
            type: Number,
            required:false
        },
        weight:{
            type:Number,
            required:false
        },
        height:{
            type:Number,
            required:false
        },
        address:{
            type: String,
            required:false
        }
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User