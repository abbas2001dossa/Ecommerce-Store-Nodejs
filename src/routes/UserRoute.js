const express=require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyToken=require('../middlewares/auth');


router.post('/register',userController.registerUser);
router.get('/get',verifyToken,userController.getUsers);
router.get('/get/:id',verifyToken,userController.getUserById);
router.post('/login',userController.login);



module.exports = router;
