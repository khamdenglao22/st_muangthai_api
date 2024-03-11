const socialController = require("../controllers/social-controller")
const router = require("express").Router();

router.get('/',socialController.FindAllSocial)
router.post('/',socialController.createNewSocial)
router.put('/:id',socialController.updateSocial)
router.get('/:id',socialController.findSocialById)
router.delete('/:id',socialController.deleteSocial)

module.exports = router