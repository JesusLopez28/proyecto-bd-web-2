import express from 'express'
import { Product } from '../types/product.type'
import ProductService from '../services/product.service'
import passport from 'passport'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new ProductService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { categoryId } = req.body; 

    const product: Product = req.body;
    const newProduct = await service.create(product, categoryId as unknown as ObjectId);

    res.status(201).json(newProduct);
  }
);

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
      const product = await service.findByCategory(req.params.id as unknown as ObjectId)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

export default router