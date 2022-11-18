const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminAuthSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Name is required field"]
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"Email is required field"],
        unique:true
    },
    phone:{
        type:String,
     trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    confirmPassword:{
        type:String,
        required:true,
        trim:true
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        default:Date.now()
    },
    updatedAt:{
        type:String,
        default:Date.now()
    },
    

})
// creating admin auth models

const AdminAuth = mongoose.model("admin-auth",adminAuthSchema)

//exporting admin auth models

module.exports = {AdminAuth};
