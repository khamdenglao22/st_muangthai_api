const NewsActivityController = require("../controllers/news-activity-controller")
const router = require("express").Router();

router.get("/", NewsActivityController.findAllNewsActivity)
router.get("/active", NewsActivityController.findAllNewsActive)
router.get("/:id", NewsActivityController.findNewsActivityById)
router.put("/:id", NewsActivityController.updateNewsActivity)
router.put("/update-active/:id", NewsActivityController.updateNewsActive)
router.delete("/:id", NewsActivityController.deleteNewsActivity)
router.post("/", NewsActivityController.createNews)

module.exports = router;