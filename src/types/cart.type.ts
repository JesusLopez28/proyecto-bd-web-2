import type { Model, ObjectId } from 'mongoose'
import { User } from './user.type'
import { Product } from './product.type'

export type ProductInCart = {
  product: ObjectId
  quantity: number
}

export type Cart = {
  id?: string
  user: ObjectId
  products: ProductInCart[]
  createdAt?: Date
  lastModified?: Date
}

export type CartModel = Model<Cart>
