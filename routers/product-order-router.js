const ProductOrderController = require("../controllers/product-order-controller");
const router = require("express").Router();

router.get("/", ProductOrderController.findAllProductOrder);
router.post("/", ProductOrderController.createProductOrder);

module.exports = router;
