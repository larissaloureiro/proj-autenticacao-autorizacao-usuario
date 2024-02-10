const { Router } = require('express')
const UserController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

const router = Router()
router.use(verifyJWT)

router
  .post('/users', UserController.createUser)
  .get('/users', UserController.findAllUsers)
  .get('/users/:id', UserController.findUserById)
  .put('/users/:id', verifyRoles(['Admin']), UserController.updateUserById)
  .delete('/users/:id', verifyRoles(['Admin']), UserController.deleteUserById)

module.exports = router