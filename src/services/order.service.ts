import { ObjectId } from 'mongoose'
import Orders from '../models/order.model'
import { Order, OrderModel } from '../types/order.type'
import boom from '@hapi/boom'

class OrderService {
  async create(order: Order) {
    const newOrder = await Orders.create(order).catch((error) => {
      console.log('Could not save order', error)
    })

    if (!newOrder) {
      throw boom.badRequest('Could not create order')
    }

    return newOrder
  }

  async findAll() {
    const orders = await Orders.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!orders) {
      throw boom.notFound('There are not orders')
    }

    return orders
  }

  async findById(id: string) {
    const order = await Orders.findById(id).catch((error) => {
      console.log('Could not retrieve order info', error)
    })

    if (!order) {
      throw boom.notFound('Order not found')
    }

    return order
  }

  async findByUser(userId: ObjectId) {
    const orders = await Orders.find({ user: userId }).catch((error) => {
      console.log('Could not retrieve order info', error)
    })

    if (!orders) {
      throw boom.notFound('Order not found')
    }

    return orders
  }

  async update(id: string, order: Partial<Order>) {
    const updatedOrder = await Orders.findByIdAndUpdate(id, order, {
      new: true
    }).catch((error) => {
      console.log('Could not update order info', error)
    })

    if (!updatedOrder) {
      throw boom.notFound('Order not found')
    }

    return updatedOrder
  }

  async delete(id: string) {
    const deletedOrder = await Orders.findByIdAndDelete(id).catch((error) => {
      console.log('Could not delete order', error)
    })

    if (!deletedOrder) {
      throw boom.notFound('Order not found')
    }

    return deletedOrder
  }

  async updateStatus(id: string, status: string) {
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!updatedOrder) {
      throw boom.notFound('Order not found')
    }

    return updatedOrder
  }

  async updateTotalAmount(id: string, totalAmount: number) {
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { totalAmount },
      { new: true }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!updatedOrder) {
      throw boom.notFound('Order not found')
    }

    return updatedOrder
  }

  async updateProducts(
    id: string,
    products: Array<{ product: ObjectId; quantity: number }>
  ) {
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { products },
      { new: true }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!updatedOrder) {
      throw boom.notFound('Order not found')
    }

    return updatedOrder
  }
}

export default OrderService
