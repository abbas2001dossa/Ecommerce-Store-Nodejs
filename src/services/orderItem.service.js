const OrderItem = require('../models/OrderItem');

exports.addOrderItem = async (orderItems) => {
    try {
       
        const orderItemPromises = orderItems.map(async item => {
            let order = new OrderItem({
                quantity: item.quantity,
                product: item.product
            });
            await order.save();
            return order.id;
        });

        const orderItemIds = await Promise.all(orderItemPromises);
        return orderItemIds;
    } catch (err) {
        return null;
    }
}


exports.deleteOrderItems=async (findOrder)=>{
    try{
        // console.log(findOrder)
        const deletedOrderItems = findOrder.orderItems.map(async item=>{
           let orderItem= await OrderItem.findByIdAndDelete(item.id);
            return orderItem._id;   
        });

        const orderItemIds = await Promise.all(deletedOrderItems);
        if(!orderItemIds){return null;}
        return orderItemIds;
    }
    catch(err){
        console.log(err)
        return null;
    }
}


exports.getTotalPrice = async (OrderItemsResolved)=>{
    try{
        const orderItemPrices = await Promise.all(OrderItemsResolved.map( async (id)=>{
            const orderItem= await OrderItem.findById(id).populate('product','price');
            const orderItemTotalPrice = orderItem.product.price * orderItem.quantity  ;   // order item has -- product and quantity  
            return orderItemTotalPrice;
        }));

        let price=0;
        orderItemPrices.map((item)=>{
            price = price + item;
        });
        if(price){return price;}
        return null;
    }
    catch(err)
    {return null;}
}
