const request = require('supertest')
const app = require('../../app')
const { sign } = require('jsonwebtoken')
const { Op } = require('sequelize')
const database = require('../../models')
const uuid = require('uuid')

let server;

beforeEach(() => {
  const port = 3000
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

describe('GET em /roles', () => {
  test('Deve retornar uma lista de roles', async () => {
    const res = await request(app)
      .get('/roles')
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(200);
    expect(res.body)
  });
});

let newRoleId
describe('POST em /roles', () => {
  test('Deve cadastrar uma role e retornar a role cadastrada no BD', async () => {
    const res = await request(app)
      .post('/roles')
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Teste'
      })
      .expect(201);
    const role = await database.roles.findOne({
      where: {
        id: res.body.id
      }
    })
    newRoleId = res.body.id
    expect(res.body.name).toEqual('Teste')
    expect(role).not.toBeNull()
  });

  test('Deve retornar erro quando já existir uma role com o mesmo "name" no BD', async () => {
    await request(app)
      .post('/roles')
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Admin'
      })
      .expect(400);
  });
});

describe('GET em /roles/:id', () => {
  test('Deve retornar a role selecionada', async () => {
    const res = await request(app)
      .get(`/roles/${newRoleId}`)
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(200);
    expect(res.body.id).toEqual(newRoleId)
  });

  test('Deve retornar erro quando a role selecionada não existir', async () => {
    await request(app)
      .get(`/roles/${uuid.v4()}`)
      .set('Accept', 'applicattion/json')
      .set('Authorization', tokenBearerAdmin)
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('PUT em /roles', () => {
  test('Deve atualizar uma role e retornar a role atualizada no BD', async () => {
    const res = await request(app)
      .put(`/roles/${newRoleId}`)
      .set('Authorization', tokenBearerAdmin)
      .send({
        name: 'Teste Updated'
      })
      .expect(200);
    const role = await database.roles.findOne({
      where: {
        id: res.body.id
      }
    })
    expect(res.body.name).toEqual('Teste Updated')
    expect(role).not.toBeNull()
  });

  test('Deve retornar erro quando a role selecionada não existir', async () => {
    await request(app)
    .put(`/roles/${uuid.v4()}`)
    .set('Authorization', tokenBearerAdmin)
    .send({
      name: 'Teste 2'
    })
    .expect(400);
  });
});

describe('DELETE em /roles/:id', () => {
  test('Deve deletar a role selecionada', async () => {
    await request(app)
      .delete(`/roles/${newRoleId}`)
      .set('Authorization', tokenBearerAdmin)
      .expect(200);
  });

  test('Deve retornar erro quando a role selecionada não existir', async () => {
    await request(app)
      .delete(`/roles/${uuid.v4()}`)
      .set('Authorization', tokenBearerAdmin)
      .expect(400);
  });
});
