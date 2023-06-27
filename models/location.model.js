import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

locationSchema.index({ location: "2dsphere" });
export default mongoose.model('location', locationSchema);
