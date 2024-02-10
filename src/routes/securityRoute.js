const { Router } = require('express')
const SegurancaController = require('../controllers/securityController')

const router = Router()

router
  .post('/security/acl', SegurancaController.createAcl)

module.exports = router