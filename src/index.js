const app = require('./app.js')
require('dotenv').config();

const port = process.env.APP_PORT

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})