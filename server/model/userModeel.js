import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:Number
    },
    phone:{
        type:Number
    }
})
const UserModel=mongoose.model("users",userSchema)
export default UserModel