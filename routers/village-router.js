const villageController = require('../controllers/village-controller')

const router = require('express').Router()

router.get('/', villageController.findAllVillage)
router.post('/', villageController.createVillage)
router.get('/:id', villageController.findVillageById)
router.put('/:id', villageController.updateVillage)



module.exports = router