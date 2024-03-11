const ProvinceController = require('../controllers/province-controller')


const router = require('express').Router()

// router
router.get('/', ProvinceController.findAllProvince)
router.post('/', ProvinceController.createProvince)
router.get('/:id', ProvinceController.findProvinceById)
router.put('/:id', ProvinceController.updateProvince)


module.exports = router