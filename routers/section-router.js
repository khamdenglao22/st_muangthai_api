const ServiceSection = require("../controllers/section-controller");
const router = require("express").Router();

router.get("/", ServiceSection.findAllSection);
router.get("/frontend", ServiceSection.findAllSectionFrontend);
router.get("/:id", ServiceSection.findSectionById);
router.put("/:id", ServiceSection.updateSection);
router.delete("/:id", ServiceSection.deleteSection);
router.post("/", ServiceSection.createSection);

module.exports = router;
