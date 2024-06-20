import { Schema, model } from 'mongoose'
import { Cart, CartModel } from '../types/cart.type'
import { USER_REFERENCE } from './user.model'
import { PRODUCT_REFERENCE } from './product.model'

export const CART_REFERENCE = 'Cart'

const Carts = new Schema<Cart, CartModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_REFERENCE,
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_REFERENCE,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

export default model(CART_REFERENCE, Carts)
