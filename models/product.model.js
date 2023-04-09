import mongoose from "mongoose";
import categoryModel from './category.model'

const Schema =  mongoose.Schema;

const prodSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    vendor_price:{
        type: Number,
        required: true
    },
    user_price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: categoryModel,
        required: true
    },
    thumbnail:{
        type: String,
        required:true
    },
    images:{
        type: Array,
        required: true
    }


});

export default mongoose.model('Product',prodSchema)