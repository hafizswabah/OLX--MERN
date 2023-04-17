import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    userId:{
        type:String,
        required:true
    }
}, {timestamps:true})

const productModel = mongoose.model("product", productSchema)
export default productModel