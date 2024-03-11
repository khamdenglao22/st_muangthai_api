const WorkController = require("../controllers/work-controller")
const router = require("express").Router();

router.get("/", WorkController.findAllWork)
router.get("/:id", WorkController.findWorkById)
router.put("/:id", WorkController.updateWork)
router.delete("/:id", WorkController.deleteWork)
router.post("/", WorkController.createWork)

module.exports = router;