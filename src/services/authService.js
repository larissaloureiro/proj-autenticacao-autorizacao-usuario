const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
require('dotenv').config();

class AuthService {
  async login(dto){
    const user = await database.users.findOne({
      attributes: ['id', 'email', 'password'],
      where: {
        email: dto.email
      }
    })

    if (!user) {
      throw new Error('Usuário não cadastrado')
    }

    const passwordMatches = await compare(dto.password, user.password)

    if (!passwordMatches) {
      throw new Error('Usuário ou password inválido')
    }
    const accessToken = sign({
      id: user.id,
      email: user.email
    },process.env.SECRET,{
      expiresIn: 86400
    })
    return { accessToken }
  }
}

module.exports = AuthService