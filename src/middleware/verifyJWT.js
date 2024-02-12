const { verify, decode } = require('jsonwebtoken')
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token){
    return res.status(400).send('Access token não informado')
  }
  const [ , accessToken ] = token.split(" ")
  try {
    verify(accessToken, process.env.SECRET)
    const { id, email } = await decode(accessToken)
    req.userId = id
    req.userEmail = email
    return next()
  } catch (error) {
    return res.status(401).send('Usuário não autenticado')
  }
}