import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: Array,
            required: true
        }
    }
});

export default mongoose.model('location', locationSchema);
