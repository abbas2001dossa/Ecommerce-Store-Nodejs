const express=require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const verifyToken=require('../middlewares/auth');


// get product will nopt have any auth used
router.get('/get',ProductController.getproduct);
router.post('/add',ProductController.addProduct);
router.get('/get/:id',ProductController.getProductById);
router.put('/:id',ProductController.updateProduct);
router.delete('/:id',ProductController.deleteProduct);
router.get('/count',ProductController.countProducts);
router.get('/featured/:count',ProductController.featuredProducts);

module.exports = router;


