const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
  .post('/role', RoleController.createRole)
  .get('/role', RoleController.findAllRoles)
  .get('/role/id/:id', RoleController.findRoleById)
  .put('/role/id/:id', RoleController.updateRoleById)
  .delete('/role/id/:id', RoleController.deleteRoleById)

module.exports = router