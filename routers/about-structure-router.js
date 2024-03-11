const aboutStructureController = require("../controllers/about-structure-controller");
const router = require("express").Router();

router.get("/", aboutStructureController.FindAllAboutStructure);
router.get("/page/", aboutStructureController.FindAllPageAboutStructure);
router.post("/", aboutStructureController.createNewAboutStructure);
router.put("/:id", aboutStructureController.updateAboutStructure);
router.get("/:id", aboutStructureController.findAboutStructureById);
router.delete("/:id", aboutStructureController.deleteStructureById);

module.exports = router;
