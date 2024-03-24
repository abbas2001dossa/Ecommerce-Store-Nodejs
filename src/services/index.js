const productService=require('./products.service');
const categoryService=require('./category.service');
const userService = require('./user.service');
const generalService=require('./general.service');
const orderService =require('./order.service');
const orderItemService=require('./orderItem.service');

module.exports={
    productService,
    categoryService,
    userService,
    generalService,
    orderService,
    orderItemService
}