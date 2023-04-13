import mongoose from "mongoose";

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
        type: Array,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    personal:{
        type:String,
        
    }
    
});

export default mongoose.model('vendor', vendorSchema);