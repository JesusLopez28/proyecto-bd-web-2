import express from 'express'
import { Product } from '../types/product.type'
import ProductService from '../services/product.service'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import { parse } from 'dotenv'

const router = express.Router()
const service = new ProductService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { categoryId } = req.body

    const product: Product = req.body
    const newProduct = await service.create(
      product,
      categoryId as unknown as ObjectId
    )

    res.status(201).json(newProduct)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const products = await service.findAll()
      res.status(200).json(products)
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
      const product = await service.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/searchByName/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product = await service.findByName(req.params.name as string)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/searchByCategory/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product = await service.findByCategory(
        req.params.id as unknown as ObjectId
      )
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/findByPriceRange/:min/:max',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const min = parseFloat(req.params.min)
      const max = parseFloat(req.params.max)

      if (min > max) {
        res.status(400).json({ message: 'Min should be less than max' })
      }

      const products = await service.findByPriceRange(min, max)
      res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }
)

//Borrar producto
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

export default router
