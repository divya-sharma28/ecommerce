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
        required: true,
        default:'Processing'
    },

    userID:{
        type: Object,
        required: true
    },

    vendorID:{
        type: Object,
        required: true
    }
    



 }, {
    timestamps: true
 })
 

 export default mongoose.model('vendorOrder', vendorOrdersSchema);