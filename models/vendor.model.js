import mongoose from "mongoose";
import categoryModel from "./category.model";
import locationModel from "./location.model";

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: categoryModel,
        required: true
    },
    location:{
        type: Schema.Types.ObjectId,
        ref:locationModel,
        required: true
    }
    
});

export default mongoose.model('vendor', vendorSchema);