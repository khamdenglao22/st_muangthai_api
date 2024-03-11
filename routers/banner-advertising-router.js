const bannerAdvertising = require("../controllers/banner-advertising-controller")
const router = require("express").Router();

router.get('/',bannerAdvertising.FindAllBannerAdvertising)
router.get('/active',bannerAdvertising.findAllBannerAdvertisingActive)
router.post('/',bannerAdvertising.createNewBannerAdvertising)
router.put('/:id',bannerAdvertising.updateBannerAdvertising)
router.put("/update-active/:id", bannerAdvertising.updateBannerAdvertisingActive)
router.get('/:id',bannerAdvertising.findBannerAdvertisingById)
router.delete('/:id',bannerAdvertising.deleteBannerAdvertising)

module.exports = router