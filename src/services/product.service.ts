import { ObjectId } from 'mongoose'
import Products from '../models/product.model'
import { Product, ProductModel } from '../types/product.type'
import boom from '@hapi/boom'

class ProductService {
  async create(product: Product, categoryId: ObjectId) {
    const newProduct = await Products.create({
      ...product,
      category: categoryId
    }).catch((error) => {
      console.log('Could not save product', error)
    })

    const existingProduct = await this.findById((newProduct as any)._id)
    return existingProduct.populate([
      { path: 'category', strictPopulate: false }
    ])
  }

  async findAll() {
    const products = await Products.find()
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!products) {
      throw boom.notFound('There are not products')
    }

    return products
  }

  async findById(id: string) {
    const product = await Products.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async findByName(name: string) {
    const product = await Products.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async findByCategory(categoryId: ObjectId) {
    const products = await Products.find({ category: categoryId }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )

    if (!products) {
      throw boom.notFound('There are not products')
    }

    return products
  }
}

export default ProductService
