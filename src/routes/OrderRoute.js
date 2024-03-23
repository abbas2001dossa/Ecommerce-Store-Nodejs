const express=require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');



router.get('/get',orderController.getOrder);




module.exports = router;
