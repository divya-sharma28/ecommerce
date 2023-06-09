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
    address:{
        type: String,
        required: true
    },
    
    vendor_location: {
        type: {
          type: String,
          required: true,
        },
        coordinates: {
          type: [Number], // Specify the array type as Number
          required: true,
        },
      },
    });
vendorSchema.index({ vendor_location: "2dsphere" }); // Create 2dsphere index on vendor_location field

export default mongoose.model('vendor', vendorSchema);


