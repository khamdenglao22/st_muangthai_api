const NewsActivityGalleryController = require("../controllers/news-activity-gallery-controller")
const router = require("express").Router();

router.get("/:id", NewsActivityGalleryController.findByNewsActivityGalleryId)
router.delete("/:id", NewsActivityGalleryController.deleteNewsActivityGallery)
router.post("/", NewsActivityGalleryController.createNewsGallery)

module.exports = router;