const RoleController = require('../controllers/role-controller')


const router = require('express').Router()

// router
router.get('/', RoleController.findAllRole)
router.get('/:id', RoleController.findRoleById)
router.post('/', RoleController.createRole)
router.put('/:id', RoleController.updateRole)
router.delete('/:id', RoleController.deleteRole)

module.exports = router