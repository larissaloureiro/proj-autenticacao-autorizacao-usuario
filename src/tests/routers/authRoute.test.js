const request = require('supertest')
const app = require('../../app')
const uuid = require('uuid')
const database = require('../../models')
const { hash } = require('bcryptjs')

let server;
let newUserId

beforeEach(async () => {
  const port = 3002
  server = app.listen(port)
  const passwordHash = await hash('passwordtest', 8)
  const newUser = await database.users.create({
    id: uuid.v4(),
    name: 'Teste',
    email: 'teste@teste.com',
    password: passwordHash
  })
  newUserId = newUser.id
});

afterEach(async () => {
  await database.users.destroy({
    where: {
      id: newUserId
    }
  });
  server.close();
});

describe('POST em /auth/login', () => {
  test('Deve fazer login do user e retornar o access token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@teste.com',
        password: 'passwordtest'
      })
      .expect(200);
    expect(res.body).not.toBeNull()
  });

  test('Deve retornar erro ao tentar fazer login do user com senha incorreta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@teste.com',
        password: 'passwordtest2'
      })
      .expect(401);
  });

  test('Deve retornar erro ao tentar fazer login com user inválido', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste2@teste.com',
        password: 'passwordtest'
      })
      .expect(401);
  });
});