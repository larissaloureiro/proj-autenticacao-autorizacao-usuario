const bodyParser = require('body-parser')
const user = require('./userRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')
const security = require('./securityRoute')


module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    user,
    role,
    security
  )
}