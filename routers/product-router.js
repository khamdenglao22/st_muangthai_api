const Product = require("../controllers/product-controller")
const router = require("express").Router();

router.get('/',Product.findAllProduct)
router.post('/',Product.createProduct)
router.put('/:id',Product.updateProduct)
router.get('/:id',Product.findProductById)
router.delete('/:id',Product.deleteProduct)

module.exports = router