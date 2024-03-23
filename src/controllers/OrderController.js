const { orderService } = require('../services');
const response = require('../utils/responseHelpers');


const getOrder = async (req,res)=>{
    try{
        const findOrders = await orderService.getOrder();
        if(!findOrders){
            return response.notFound(res,"No Orders Found");
        }
        return response.success(res,"Orders Retrieved Successfully",{Orders:findOrders});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const createOrder = async (req,res)=>{
    try{
        const {
            orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user
        }=req.body;

        const addO = await orderService.addOrder(orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user);
        if(!addO){
            return response.notFound(res,"Order Cannot Be Created");
        }
        return response.success(res,"Order Created Successfully",{Order:addO});
    }
    catch(err){
        return response.serverError(res,err);
    }
}


module.exports={
    getOrder,
    createOrder
}