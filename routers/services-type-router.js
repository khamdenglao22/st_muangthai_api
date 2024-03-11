const serviceTypeController = require("../controllers/services-type-controller");
const router = require("express").Router();

router.get('/', serviceTypeController.findAllServicesType)
router.get('/:id', serviceTypeController.findServicesTypeById)
router.post('/', serviceTypeController.createServicesType)
router.put('/:id', serviceTypeController.updateServicesType)
router.delete('/:id', serviceTypeController.deleteServicesType)

module.exports = router;