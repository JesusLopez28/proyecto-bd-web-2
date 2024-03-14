import { Schema, model } from 'mongoose'
import { Product, ProductModel } from '../types/product.type'
import { CATEGORY_REFERENCE } from './category.model'

export const PRODUCT_REFERENCE = 'Product'

const Products = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: CATEGORY_REFERENCE
  }
})

export default model(PRODUCT_REFERENCE, Products)
