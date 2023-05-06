import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: 'default.png'
    }
});


export default mongoose.model('category', categorySchema);




