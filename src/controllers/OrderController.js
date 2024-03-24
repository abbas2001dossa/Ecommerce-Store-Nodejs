const { orderService ,orderItemService} = require('../services');
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
            orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,user
        }=req.body;

        if(!orderItems || !shippingAddress1 || !shippingAddress2 || !city || !zip || !country || !phone || !user ){
            return response.notFound(res,"Order Details Incomplete");
        }

        // add order Item
        const OrderItemsResolved = await orderItemService.addOrderItem(orderItems);  //works perfectly 
        if(!OrderItemsResolved){
            return response.badRequest(res,"Order Item Cannot Be Created ");
        }

        // getting total price of the order
        const totalPrice= await orderItemService.getTotalPrice(OrderItemsResolved);
        if(!totalPrice){
            return response.badRequest(res,"Cannot Calculate Total Price Of The Order ");
        }

        const addO = await orderService.addOrder(OrderItemsResolved,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user);
        if(!addO){
            return response.badRequest(res,'Order Cannot Be Created');
        }
        return response.success(res,"Order Created Successfully",{Order:addO});
    }
    catch(err){
        console.log(err)
        return response.serverError(res,err);
    }
}

const getOrderById = async (req,res)=>{
    try{
        const id=req.params.id;
        const getOrder = await orderService.getOrderById(id);
        if(!getOrder){
            return response.badRequest(res,"Order Cannot Be Retrieved ");
        }
        return response.success(res,"Order Retrieved Successfully",{Order:getOrder});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const acceptOrder = async (req,res)=>{
    try{
        const id = req.params.id;
        const {status}=req.body;
        if(!status){
            return response.notFound(res,"Incomplete Details");
        }

        const findOrder = await orderService.getOrderById(id);
        if(!findOrder){
            return response.notFound(res,"Order Cannot Be Found");
        }

        const updateOrder = await orderService.updateStatus(id,status);
        if(!updateOrder){
            return response.badRequest(res,"Order Cannot Be Updated");
        }

        return response.success(res,"Order Status Accepted By Admin Successfully",{Order:updateOrder});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const deleteOrder=async (req,res)=>{
    try{
        const id=req.params.id;

        const findOrder = await orderService.getOrderById(id);
        if(!findOrder){
            return response.notFound(res,"Order Not Found");
        }

        // delete orderItems
        const deleteOrderitems = await orderItemService.deleteOrderItems(findOrder);
        if(!deleteOrderitems){
            return response.badRequest(res,"Order Items Cannot Be Deleted");
        }

        // delete order 
        const deleteO = await orderService.delete(id);
        if(!deleteO){
            return response.badRequest(res,"Order Cannot Be Deleted");
        }
        return response.success(res,"Order Deleted Successfully",{Order:deleteO});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const getTotalSales = async (req,res)=>{
    try{
        const totalS = await orderService.totalSales();
        if(!totalS){
            return response.badRequest(res,"Total Sales Cannot Be Calculated");
        }
        return response.success(res,"Total Sales Successfully Calculated",{TotalSales:totalS});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    getOrder,
    createOrder,
    getOrderById,
    acceptOrder,
    deleteOrder,
    getTotalSales
}