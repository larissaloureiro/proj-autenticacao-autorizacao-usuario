const { Router } = require('express')
const UserController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

const router = Router()
router.use(verifyJWT)

router
  .post('/user', UserController.createUser)
  .get('/user', UserController.findAllUsers)
  .get('/user/id/:id', UserController.findUserById)
  .put('/user/id/:id', UserController.updateUserById)
  .delete('/user/id/:id', UserController.deleteUserById)

module.exports = router