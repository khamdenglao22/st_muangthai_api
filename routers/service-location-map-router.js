const serviceLocationMapController = require("../controllers/service-location-map-controller");
const router = require("express").Router();

router.get("/", serviceLocationMapController.FindAllLocationMap);
router.get(
  "/map-province",
  serviceLocationMapController.findLocationMapByProvinceId
);
router.get(
  "/map-section",
  serviceLocationMapController.findLocationMapBySectionId
);
router.get("/:id", serviceLocationMapController.findLocationMapById);
router.put("/:id", serviceLocationMapController.updateLocationMap);
router.post("/", serviceLocationMapController.createLocationMap);

module.exports = router;
