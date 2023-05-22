 import mongoose from "mongoose";
 const Schema = mongoose.Schema;

 const vendorOrdersSchema = new Schema({
    date:{
        type:Date,
        default: new Date().toDateString(), 
    },
    items:{
        type: Number,
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
    



 })
 

 export default mongoose.model('vendorOrder', vendorOrdersSchema);