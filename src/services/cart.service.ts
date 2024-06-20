import { ObjectId } from 'mongoose'
import Carts from '../models/cart.model'
import { Cart, CartModel, ProductInCart } from '../types/cart.type'
import boom from '@hapi/boom'

class CartService {
  async create(cart: Cart) {
    const newCart = await Carts.create(cart).catch((error) => {
      console.log('Could not save cart', error)
    })

    if (!newCart) {
      throw boom.badRequest('Could not create cart')
    }

    return newCart
  }

  async findAll() {
    const carts = await Carts.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!carts) {
      throw boom.notFound('There are no carts')
    }

    return carts
  }

  async findById(id: string) {
    const cart = await Carts.findById(id).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!cart) {
      throw boom.notFound('Cart not found')
    }

    return cart
  }

  async findByUser(userId: ObjectId) {
    const carts = await Carts.find({ user: userId }).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!carts) {
      throw boom.notFound('Cart not found')
    }

    return carts
  }

  async update(id: string, cart: Partial<Cart>) {
    const updatedCart = await Carts.findByIdAndUpdate(id, cart, {
      new: true
    }).catch((error) => {
      console.log('Could not update cart info', error)
    })

    if (!updatedCart) {
      throw boom.notFound('Cart not found')
    }

    return updatedCart
  }

  async delete(id: string) {
    const deletedCart = await Carts.findByIdAndDelete(id).catch((error) => {
      console.log('Could not delete cart', error)
    })

    if (!deletedCart) {
      throw boom.notFound('Cart not found')
    }

    return deletedCart
  }

  async addProduct(id: string, productId: ObjectId, quantity: number) {
    const cart = await Carts.findById(id).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!cart) {
      throw boom.notFound('Cart not found')
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId.toString()
    )

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity
    } else {
      cart.products.push({ product: productId, quantity })
    }

    const updatedCart = await cart.save().catch((error) => {
      console.log('Could not update cart info', error)
    })

    if (!updatedCart) {
      throw boom.badRequest('Could not add product to cart')
    }

    return updatedCart
  }

  async removeProduct(id: string, productId: ObjectId) {
    const cart = await Carts.findById(id).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!cart) {
      throw boom.notFound('Cart not found')
    }

    cart.products = cart.products.filter(
      (product) => product.product.toString() !== productId.toString()
    )

    const updatedCart = await cart.save().catch((error) => {
      console.log('Could not update cart info', error)
    })

    if (!updatedCart) {
      throw boom.badRequest('Could not remove product from cart')
    }

    return updatedCart
  }

  async updateProductQuantity(
    id: string,
    productId: ObjectId,
    quantity: number
  ) {
    const cart = await Carts.findById(id).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!cart) {
      throw boom.notFound('Cart not found')
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId.toString()
    )

    if (productIndex === -1) {
      throw boom.notFound('Product not found in cart')
    }

    cart.products[productIndex].quantity = quantity

    const updatedCart = await cart.save().catch((error) => {
      console.log('Could not update cart info', error)
    })

    if (!updatedCart) {
      throw boom.badRequest('Could not update product quantity in cart')
    }

    return updatedCart
  }

  async clearProducts(id: string) {
    const cart = await Carts.findById(id).catch((error) => {
      console.log('Could not retrieve cart info', error)
    })

    if (!cart) {
      throw boom.notFound('Cart not found')
    }

    cart.products = []

    const updatedCart = await cart.save().catch((error) => {
      console.log('Could not update cart info', error)
    })

    if (!updatedCart) {
      throw boom.badRequest('Could not clear products from cart')
    }

    return updatedCart
  }

  async deleteAll() {
    const deletedCarts = await Carts.deleteMany({}).catch((error) => {
      console.log('Could not delete carts', error)
    })

    if (!deletedCarts) {
      throw boom.notFound('Carts not found')
    }

    return deletedCarts
  }
}

export default CartService
