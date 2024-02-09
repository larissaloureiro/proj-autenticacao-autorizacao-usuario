const { Router } = require('express')
const UserController = require('../controllers/userController')

const router = Router()

router
  .post('/user', UserController.createUser)
  .get('/user', UserController.findAllUsers)
  .get('/user/id/:id', UserController.findUserById)
  .put('/user/id/:id', UserController.updateUserById)
  .delete('/user/id/:id', UserController.deleteUserById)

module.exports = router