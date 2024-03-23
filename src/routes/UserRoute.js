const express=require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyToken=require('../middlewares/auth');

// to access api requests , proper authorization and admin role is needed - for product and category apis specially 

router.post('/register',userController.registerUser);
router.get('/get',verifyToken,userController.getUsers);
router.get('/get/:id',verifyToken,userController.getUserById);
router.post('/login',userController.login); 
router.get('/count',verifyToken,userController.countUser);
router.put('/:id',verifyToken,userController.updateUser);
router.put('/changePassword',verifyToken,userController.changePassword);
router.delete('/:id',verifyToken,userController.deleteUser);

module.exports = router;
