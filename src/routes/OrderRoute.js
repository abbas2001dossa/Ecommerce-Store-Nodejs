const express=require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const verifyToken=require('../middlewares/auth');


router.get('/get',verifyToken,orderController.getOrder);
router.post('/add',verifyToken,orderController.createOrder);
router.get('/get/:id',verifyToken,orderController.getOrderById);
router.put('/acceptOrder/:id',verifyToken,orderController.acceptOrder);
router.delete('/:id',verifyToken,orderController.deleteOrder);
router.get('/totalSales',verifyToken,orderController.getTotalSales);  // asdmin panel 
router.get('/count',verifyToken,orderController.getTotalCount);

module.exports = router;
