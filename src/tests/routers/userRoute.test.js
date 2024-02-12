const request = require('supertest')
const app = require('../../app')
const { sign } = require('jsonwebtoken')
const { Op } = require('sequelize')
const database = require('../../models')
const uuid = require('uuid')

let server;

beforeEach(() => {
  const port = 3001
  server = app.listen(port)
});

afterEach(() => {
  server.close();
});

let roleAdmin;
let userRolesAdmin
let admin
let accessTokenAdmin
let tokenBearerAdmin

beforeAll(async () => {
  roleAdmin = await database.roles.findOne({
    where: {
      name: 'Admin'
    }
  })

  
  userRolesAdmin = await database.users_roles.findOne({
    where: {
      role_id: roleAdmin.id
    }
  })

  
  admin = await database.users.findOne({
    where: {
      id: userRolesAdmin.user_id
    }
  })

  accessTokenAdmin = sign({
    id: admin.id,
    email: admin.email
  },process.env.SECRET,{
    expiresIn: 86400
  })
  
  tokenBearerAdmin = 'Bearer ' + accessTokenAdmin
})



describe('GET em /users', () => {
  test('Deve retornar uma lista de users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(200);
    expect(res.body)
  });
});

let newUserId
describe('POST em /users', () => {
  test('Deve cadastrar um user e retornar o user cadastrado no BD', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Teste',
        email: 'testeuser@teste.com',
        password: 'passwordtest'
      })
      .expect(201);
    const user = await database.users.findOne({
      where: {
        id: res.body.id
      }
    })
    newUserId = res.body.id
    expect(res.body.name).toEqual('Teste')
    expect(user).not.toBeNull()
  });

  test('Deve retornar erro quando os dados do user não forem informados', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', tokenBearerAdmin)
      .send({})
      .expect(400);
  });

  test('Deve retornar erro quando já existir um user com o mesmo nome no BD', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Teste',
        email: 'testeuser@teste.com',
        password: 'passwordtest'
      })
      .expect(400);
  });
});

describe('GET em /users/:id', () => {
  test('Deve retornar o user selecionado', async () => {
    const res = await request(app)
      .get(`/users/${newUserId}`)
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(200);
    expect(res.body.id).toEqual(newUserId)
  });

  test('Deve retornar erro quando o user selecionado não existir', async () => {
    await request(app)
      .get(`/users/${uuid.v4()}`)
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('PUT em /users', () => {
  test('Deve atualizar um user e retornar o user atualizado no BD', async () => {
    const res = await request(app)
      .put(`/users/${newUserId}`)
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Teste Updated'
      })
      .expect(200);
    const user = await database.users.findOne({
      where: {
        id: res.body.id
      }
    })
    expect(res.body.name).toEqual('Teste Updated')
    expect(user).not.toBeNull()
  });

  test('Deve retornar erro quando o user selecionado não existir', async () => {
    await request(app)
    .put(`/users/${uuid.v4()}`)
    .set('Authorization', tokenBearerAdmin)
    .send({
      name: 'Teste 2'
    })
    .expect(400);
  });
});

describe('DELETE em /users/:id', () => {
  test('Deve deletar o user selecionado', async () => {
    await request(app)
      .delete(`/users/${newUserId}`)
      .set('Authorization', tokenBearerAdmin)
      .expect(200);
  });

  test('Deve retornar erro quando o user selecionado não existir', async () => {
    await request(app)
      .delete(`/users/${uuid.v4()}`)
      .set('Authorization', tokenBearerAdmin)
      .expect(400);
  });
});