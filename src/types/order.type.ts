import type { Model } from 'mongoose'
import { User } from './user.type'
import { Product } from './product.type'

export type Order = {
  id?: string
  user: User
  products: Array<{ product: Product; quantity: number }>
  totalAmount: number
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
  createdAt?: Date
  lastModified?: Date
}

export type OrderModel = Model<Order>
