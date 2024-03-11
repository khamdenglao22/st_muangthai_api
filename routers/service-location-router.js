const ServiceLocationController = require("../controllers/service-location-controller");
const router = require("express").Router();

router.get("/", ServiceLocationController.findAllLocation);
router.get("/:id", ServiceLocationController.findLocationById);
router.put("/:id", ServiceLocationController.updateLocation);
router.delete("/:id", ServiceLocationController.deleteLocation);
router.post("/", ServiceLocationController.createLocation);

router.post("/prov_country", ServiceLocationController.findByProvAndCountry);
router.post(
  "/section_country",
  ServiceLocationController.findByProvAndSectionId
);

module.exports = router;
