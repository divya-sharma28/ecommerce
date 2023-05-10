import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StatusSchema = Schema({
    status:{
        type:String,
        required: true
    }
})

export default mongoose.model('status',StatusSchema)