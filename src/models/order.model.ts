import { Schema, model } from 'mongoose'
import { Order, OrderModel } from '../types/order.type'
import { USER_REFERENCE } from './user.model'
import { PRODUCT_REFERENCE } from './product.model'

export const ORDER_REFERENCE = 'Order'

const Orders = new Schema<Order, OrderModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_REFERENCE,
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: PRODUCT_REFERENCE,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

export default model(ORDER_REFERENCE, Orders)
