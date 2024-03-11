const ApplyWorkController = require("../controllers/apply-work-controller");
const router = require("express").Router();

router.get("/", ApplyWorkController.findAllApplyWork);
router.post("/", ApplyWorkController.createApplyWork);
// router.put('/:id',bannerController.updateBanner)
// router.get('/:id',bannerController.findBannerById)
// router.delete('/:id',bannerController.deleteBanner)

module.exports = router;
