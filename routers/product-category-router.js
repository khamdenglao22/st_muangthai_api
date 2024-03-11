const ProductCategoryController = require("../controllers/product-category-controller")
const router = require("express").Router();

router.get('/',ProductCategoryController.findAllProductCategory)
router.post('/',ProductCategoryController.createProductCategory)
router.put('/:id',ProductCategoryController.updateProductCategory)
router.get('/:id',ProductCategoryController.findProductCategoryById)
router.delete('/:id',ProductCategoryController.deleteProductCategory)

module.exports = router