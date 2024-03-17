const express=require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');


router.get('/get',categoryController.getCateogries);
router.post('/add',categoryController.addCategory);
router.delete('/delete/:id',categoryController.deleteCategory);
router.get('/get/:id',categoryController.getCategoryById);
router.put('/update/:id',categoryController.updateCategory);

module.exports = router;
