const UserController = require('../controllers/user-controller')


const router = require('express').Router()

// router
router.get('/', UserController.findAllUser)
// router.get('/role', UserController.findAllRole)
router.get('/:id', UserController.findUserById)
router.post('/', UserController.createUser)
router.put('/change-password/:id', UserController.changePassword)
router.put('/:id', UserController.updateUserById)
router.delete('/:id', UserController.deleteUserById)

module.exports = router