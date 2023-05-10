import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    company:{
        type: String,
        required: true
    },
    logo:{
        type: String,
        required: true  
    },
    email:{
        type: String,
        required: true
    },
   phone:{
    type: Number,
    required: true
   },
    password:{
        type: String,
        required: true
    },
    category:{
        type: Array,
        required: true
    },
    location:{
        type: String,
        required: true
    },
 
    
});

export default mongoose.model('vendor', vendorSchema);