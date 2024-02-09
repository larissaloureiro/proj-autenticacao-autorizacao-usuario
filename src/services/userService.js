const database = require('../models')
const uuid = require('uuid')
const { hash } = require('bcryptjs')

class UserService {
  async createUser(dto) {
    const user = await database.users.findOne({
      where: {
        email:dto.email
      }
    })
    if (user) {
      throw new Error('Usuário já cadastrado')
    }
    try {
      const passwordHash = await hash(dto.password, 8)
      const newUser = await database.users.create({
        id: uuid.v4(),
        name: dto.name,
        email: dto.email,
        password: passwordHash
      })
      return newUser
    } catch (error) {
      throw new Error('Erro ao cadastrar usuário')
    } 
  }

  async findAllUsers() {
    const users = await database.users.findAll()
    return users
  }

  async findUserById(id) {
    const user = await database.users.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      throw new Error('Usuário informado não cadastrado!')
    }
    return user;
  }

  async updateUserById(dto) {
    const user = await this.findUserById(dto.id);
    try {
      user.name = dto.name
      user.email = dto.email
      await user.save()
      return await user.reload()
    } catch (error) {
      throw new Error('Erro ao editar usuário.')
    }
  }

  async deleteUserById(id) {
    const user = await this.findUserById(id)
    try {
      await database.users.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error('Erro ao tentar deletar o usuário.')
    }
  }

}

module.exports = UserService