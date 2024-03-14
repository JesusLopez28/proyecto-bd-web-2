import type { Model } from 'mongoose'
import type { Request } from 'express'
import { ObjectId } from 'mongoose'

export type Category = {
  id?: string
  name: string
  description?: string
}

export type CategoryRequestType = Request & {
  category: Category
}

export type JwtRequestType = Request & {
  category: {
    sub: ObjectId
  }
}

export type CategoryMethods = {
  toClient: () => Category
}

export type CategoryModel = Model<Category>
