const request = require('supertest');
const app = require('../../app');
const verifyJWT = require('../../middleware/verifyJWT')
const { sign } = require('jsonwebtoken')

describe('verifyJWT', () => {
  it('Deve retornar erro se não informar token', async () => {
    const myReq = {
      headers: {}
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    await verifyJWT(myReq, myRes, myNext)
    expect(myRes._status).toEqual(400)
    expect(myRes._message).toEqual('Access token não informado')
  })

  it('Deve retornar erro se o token for inválido', async () => {
    const myReq = {
      headers: {
        authorization: 'Bearer xxxxx'
      }
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    await verifyJWT(myReq, myRes, myNext)
    expect(myRes._status).toEqual(401)
    expect(myRes._message).toEqual('Usuário não autenticado')
  })

  it('Deve retornar sucesso', async () => {
    const accessToken = sign({
      id: 'abcde',
      email: 'teste@email.com'
    },process.env.SECRET,{
      expiresIn: 86400
    })
    const tokenBearer = 'Bearer ' + accessToken
    const myReq = {
      headers: {
        authorization: tokenBearer
      }
    }
    const myRes = new ResponseMock();
    const myNext = jest.fn()

    await verifyJWT(myReq, myRes, myNext)
    expect(myReq.userId).toEqual('abcde')
    expect(myReq.userEmail).toEqual('teste@email.com')
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