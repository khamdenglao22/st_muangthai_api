const ProductCategorySubController = require("../controllers/product-category-sub-controller")
const router = require("express").Router();

router.get('/',ProductCategorySubController.findAllProductCategorySub)
router.post('/',ProductCategorySubController.createProductCategorySub)
router.put('/:id',ProductCategorySubController.updateProductCategorySub)
router.get('/onChange/:id',ProductCategorySubController.findAllOnChangeCategorySub)
router.get('/:id',ProductCategorySubController.findProductCategorySubById)
router.delete('/:id',ProductCategorySubController.deleteProductCategorySub)

module.exports = router