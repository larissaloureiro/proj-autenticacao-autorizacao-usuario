const database = require('../models')

const verifyRoles = (permittedRoles) => {
  return async (req, res, next) => {
    const { userId } = req
    const user = await database.users.findOne({
      include: {
        model: database.roles,
        as: 'user_roles',
        attributer: ['id', 'name']
      },
      where: {
        id: userId
      }
    })

    if(!user) {
      return res.status(401).send('Usuário não cadastrado')
    }

    const userCanAccess = user.user_roles
      .map((role) => role.name)
      .some((role) => permittedRoles.includes(role))
    
    if (!userCanAccess) {
      return res.status(403).send('Usuário não possui acesso a essa rota')
    }

    return next()
  }
}

module.exports = verifyRoles