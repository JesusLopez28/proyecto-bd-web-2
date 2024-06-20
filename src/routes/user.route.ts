import express from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import passport from 'passport'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
  try {
    //TODO: Validate user data coming from the request
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.findAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/findByEmail/:email',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.query
      const user = await service.findByEmail(email as string)
      console.log({ user })

      res.status(200).json({ user })
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
      const user = await service.findById(req.params.id)
      res.status(200).json(user)
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
      const updatedUser = await service.update(req.params.id, req.body)
      res.status(200).json(updatedUser)
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
      const deletedUser = await service.delete(req.params.id)
      res.status(200).json(deletedUser)
    } catch (error) {
      next(error)
    }
  }
)

export default router
