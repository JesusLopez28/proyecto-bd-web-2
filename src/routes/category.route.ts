import express from 'express'
import { Category } from '../types/category.type'
import CategoryService from '../services/category.service'

const router = express.Router()
const service = new CategoryService()

router.post('/', async (req, res) => {
  const category: Category = req.body
  const newCategory = await service.create(category)

  res.status(201).json(newCategory)
})

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findAll()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const category = await service.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

router.get('/searchByName/:name', async (req, res, next) => {
  try {
    const category = await service.findByName(req.params.name as string)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await service.updateById(req.params.id, req.body)
    res.status(200).json(updatedCategory)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCategory = await service.deleteById(req.params.id)
    res.status(200).json(deletedCategory)
  } catch (error) {
    next(error)
  }
})

export default router
