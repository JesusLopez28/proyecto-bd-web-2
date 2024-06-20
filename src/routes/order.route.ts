import express from 'express'
import { Order } from '../types/order.type'
import OrderService from '../services/order.service'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import { parse } from 'dotenv'

const router = express.Router()
const service = new OrderService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const order: Order = req.body
      const newOrder = await service.create(order)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const orders = await service.findAll()
      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const order = await service.findById(req.params.id)
      res.status(200).json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/findByUser/:userId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const orders = await service.findByUser(
        req.params.userId as unknown as ObjectId
      )
      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const updatedOrder = await service.update(req.params.id, req.body)
      res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const deletedOrder = await service.delete(req.params.id)
      res.status(200).json(deletedOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/updateStatus/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const updatedOrder = await service.updateStatus(
        req.params.id,
        req.body.status
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/updateTotalAmount/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const updatedOrder = await service.updateTotalAmount(
        req.params.id,
        req.body.totalAmount
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/updateProducts/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const updatedOrder = await service.updateProducts(
        req.params.id,
        req.body.products
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
)

export default router
