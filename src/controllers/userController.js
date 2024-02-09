const UserService = require('../services/userService')

const userService = new UserService()

class UserController {
  static async createUser(req, res) {
    const { name, email, password } = req.body
    try {
      const user = await userService.createUser({ name, email, password})
      res.status(201).send(user)
    } catch (error) {
      res.status(400).send({ message: error.message})
    }
  } 

  static async findAllUsers(req, res) {
    const users = await userService.findAllUsers()
    res.status(200).json(users)
  }

  static async findUserById(req, res) {
    try {
      const { id } = req.params
      const user = await userService.findUserById(id)
      res.status(200).json(user) 
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async updateUserById(req, res) {
    const { id } = req.params
    const { name, email } = req.body
    try {
      const user = await userService.updateUserById({ id, name, email })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async deleteUserById(req, res) {
    const { id } = req.params
    try {
      await userService.deleteUserById(id)
      res.status(200).send({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

module.exports = UserController