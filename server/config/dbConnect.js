import mongoose from 'mongoose'
export default function DBConnect(){
mongoose.connect("mongodb://localhost:27017/olx")
.then((res)=>{console.log('DB cConnect');})
.catch((err)=>{
    console.log("DB ERR",err);
})
}
