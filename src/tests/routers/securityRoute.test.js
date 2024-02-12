const request = require('supertest')
const app = require('../../app')
const { sign } = require('jsonwebtoken')
const database = require('../../models')
const uuid = require('uuid')
const { hash } = require('bcryptjs')

let server;
let newUserId

beforeEach(async () => {
  const port = 3003
  server = app.listen(port)
});

afterEach(async () => {
  server.close();
});

let roleAdmin;
let userRolesAdmin
let admin
let accessTokenAdmin
let tokenBearerAdmin

beforeAll(async () => {
  const passwordHash = await hash('passwordtestsecurity', 8)
  const newUser = await database.users.create({
    id: uuid.v4(),
    name: 'Teste Security',
    email: 'testesecurity@teste.com',
    password: passwordHash
  })
  newUserId = newUser.id

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

afterAll (async () => {
  await database.users.destroy({
    where: {
      id: newUserId
    }
  });
})


describe('POST em /security/acl', () => {
  test('Deve alterar roles do usuário selecionado', async () => {
    const res = await request(app)
      .post('/security/acl')
      .send({
        userId: newUserId,
        roles: [roleAdmin.id]
      })
      .set('Authorization', tokenBearerAdmin)
      .expect(201);
    console.log(res.body)
    expect(res.body.id).toEqual(newUserId)
    expect(res.body.user_roles[0].id).toEqual(roleAdmin.id)
  });

  test('Deve retornar erro ao enviar dados incompletos', async () => {
    const res = await request(app)
      .post('/security/acl')
      .send({
        roles: [roleAdmin.id]
      })
      .set('Authorization', tokenBearerAdmin)
      .expect(400);
  });
});