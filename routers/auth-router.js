const AuthController = require('../controllers/auth-controller')


const router = require('express').Router()

// router
router.post('/login', AuthController.login)

module.exports = router