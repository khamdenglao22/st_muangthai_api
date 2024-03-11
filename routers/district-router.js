const districtController = require('../controllers/district-controller')

const router = require('express').Router()

router.get('/', districtController.findAllDistrict)
router.post('/', districtController.createDistrict)
router.get('/:id', districtController.findDistrictById)
router.put('/:id', districtController.updateDistrict)


module.exports = router