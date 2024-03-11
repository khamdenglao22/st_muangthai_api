const serviceCountController = require("../controllers/service-country-controller")
const router = require("express").Router();

router.get('/', serviceCountController.findAllServiceCountry)
router.get('/:id', serviceCountController.findServiceCountryById)
router.put('/:id', serviceCountController.updateServiceCountry)
router.delete('/:id', serviceCountController.deleteServiceCountry)
router.post('/', serviceCountController.createServiceCountry)

module.exports = router;
