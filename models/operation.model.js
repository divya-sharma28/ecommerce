import mongoose from 'mongoose'

const Schema = mongoose.Schema

const operationSchema = new Schema({

    userID:{
        type:Object,
        required: true
    },
    vendorID:{
        type:Object,
        required: true
    },
    userCart:{
        type:Array,
        required: true
    },
})

export default mongoose.model("operation", operationSchema)