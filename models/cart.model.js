import mongoose from "mongoose";
import prod from './product.model'
import user from './user.model'

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  product: {
    id: {
      type: Schema.Types.ObjectId,
      ref: prod,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },

  userID: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }

});

export default mongoose.model('Cart', cartSchema)
