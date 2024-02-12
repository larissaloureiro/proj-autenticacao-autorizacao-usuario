const request = require('supertest');
const app = require('../../app');
const verifyRoles = require('../../middleware/verifyRoles')
const uuid = require('uuid')
const { Op } = require('sequelize')
const database = require('../../models')

describe('verifyRoles', () => {
  it('Deve retornar erro se o usuário não existir no BD', async () => {
    const myReq = {
      userId: uuid.v4()
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    const verify = verifyRoles(['Admin'])
    await verify(myReq, myRes, myNext)
    expect(myRes._status).toEqual(401)
    expect(myRes._message).toEqual('Usuário não cadastrado')
  })

  it('Deve retornar erro se o usuário não possuir acesso', async () => {
    const role = await database.roles.findOne({
      where: {
        name: 'Admin'
      }
    })

    const userRoles = await database.users_roles.findOne({
      where: {
        role_id: {
          [Op.ne]: role.id
        }
      }
    })

    const myReq = {
      userId: userRoles.user_id
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    const verify = verifyRoles(['Admin'])
    await verify(myReq, myRes, myNext)
    expect(myRes._status).toEqual(403)
    expect(myRes._message).toEqual('Usuário não possui acesso a essa rota')
  })

  it('Deve retornar sucesso se o usuário possuir acesso', async () => {
    const role = await database.roles.findOne({
      where: {
        name: 'Admin'
      }
    })

    const userRoles = await database.users_roles.findOne({
      where: {
        role_id: role.id
      }
    })

    const myReq = {
      userId: userRoles.user_id
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    const verify = verifyRoles(['Admin'])
    await verify(myReq, myRes, myNext)
    expect(myNext).toHaveBeenCalled()
  })

  class ResponseMock{
    _status
    _message
    status(value) {
      this._status = value
      return this
    }
    send(value) {
      this._message = value
      return this
    }
  }
})