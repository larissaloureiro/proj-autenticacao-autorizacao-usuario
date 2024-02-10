const database = require('../models')
const Sequelize = require('sequelize')

class SecurityService {
  async createAcl(dto) {
    const user = await database.users.findOne({
      include: [
        {
          model: database.roles,
          as: 'user_roles',
          attributes: ['id', 'name']
        }
      ],
      where: {
        id: dto.userId
      }
    })

    if (!user) {
      throw new Error('Usuário não cadastrado')
    }

    const newRoles = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles
        }
      }
    })

    await user.removeUser_roles(user.user_roles)
    await user.addUser_roles(newRoles)

    const newUser = await database.users.findOne({
      include: [
        {
          model: database.roles,
          as: 'user_roles',
          attributes: ['id', 'name']
        }
      ]
    })
    return newUser
  }
}

module.exports = SecurityService