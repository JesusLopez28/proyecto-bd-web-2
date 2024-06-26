import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  // getToClientUser(user: Partial<User>): Partial<User> {
  //   //Aqui podemos sobreescribir las propiedades que queremos excluir
  //   //asignandoles undefined
  //   return { ...user, password: undefined }
  // }

  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })

    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }

    return newUser
  }

  async findAll() {
    const users = await Users.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!users) {
      throw boom.notFound('There are not users')
    }

    return users
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }

  async findById(id: string) {
    const user = await Users.findById(id).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }

  async update(id: string, user: Partial<User>) {
    const updatedUser = await Users.findByIdAndUpdate(id, user, {
      new: true
    }).catch((error) => {
      console.log('Could not update user info', error)
    })

    if (!updatedUser) {
      throw boom.notFound('User not found')
    }

    return updatedUser
  }

  async delete(id: string) {
    const deletedUser = await Users.findByIdAndDelete(id).catch((error) => {
      console.log('Could not delete user', error)
    })

    if (!deletedUser) {
      throw boom.notFound('User not found')
    }

    return deletedUser
  }
}

export default UserService
