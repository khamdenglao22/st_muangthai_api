const bannerController = require("../controllers/banner-controller")
const router = require("express").Router();

router.get('/',bannerController.FindAllBanner)
router.post('/',bannerController.createNewBanner)
router.put('/:id',bannerController.updateBanner)
router.get('/:id',bannerController.findBannerById)
router.delete('/:id',bannerController.deleteBanner)

module.exports = router