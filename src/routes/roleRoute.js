const { Router } = require('express')
const RoleController = require('../controllers/roleController')
const verifyRoles = require('../middleware/verifyRoles')

const router = Router()

router
  .post('/roles', verifyRoles(['Admin']), RoleController.createRole)
  .get('/roles', verifyRoles(['Admin']), RoleController.findAllRoles)
  .get('/roles/:id', verifyRoles(['Admin']), RoleController.findRoleById)
  .put('/roles/:id', verifyRoles(['Admin']), RoleController.updateRoleById)
  .delete('/roles/:id', verifyRoles(['Admin']), RoleController.deleteRoleById)

module.exports = router