import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },
});

export default mongoose.model('location', locationSchema);
