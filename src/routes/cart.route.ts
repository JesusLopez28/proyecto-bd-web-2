import express from 'express'
import { Cart } from '../types/cart.type'
import CartService from '../services/cart.service'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import { parse } from 'dotenv'

const router = express.Router()
const service = new CartService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const cart: Cart = req.body
      const newCart = await service.create(cart)
      res.status(201).json(newCart)
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
      const carts = await service.findAll()
      res.status(200).json(carts)
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
      const cart = await service.findById(req.params.id)
      res.status(200).json(cart)
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
      const carts = await service.findByUser(
        req.params.userId as unknown as ObjectId
      )
      res.status(200).json(carts)
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
      const cart: Partial<Cart> = req.body
      const updatedCart = await service.update(req.params.id, cart)
      res.status(200).json(updatedCart)
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
      const deletedCart = await service.delete(req.params.id)
      res.status(200).json(deletedCart)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/:id/addProduct',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const productId: ObjectId = req.body.productId
      const quantity: number = req.body.quantity
      const cart = await service.addProduct(req.params.id, productId, quantity)
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id/removeProduct/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const productId: ObjectId = req.params.productId as unknown as ObjectId
      const cart = await service.removeProduct(req.params.id, productId)
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id/updateProductQuantity/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const productId: ObjectId = req.params.productId as unknown as ObjectId
      const quantity: number = req.body.quantity
      const cart = await service.updateProductQuantity(
        req.params.id,
        productId,
        quantity
      )
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id/clearProducts',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const cart = await service.clearProducts(req.params.id)
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/deleteAll',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const deletedCarts = await service.deleteAll()
      res.status(200).json(deletedCarts)
    } catch (error) {
      next(error)
    }
  }
)

export default router
