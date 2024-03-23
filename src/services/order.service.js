const Order = require('../models/Orders');


exports.getOrder= async ()=>{
    try{
        const orders =await Order.find();
        if(orders.length > 0 ){
            return orders;
        }
        return null;
    }
    catch(err){
        return null;
    }
}

exports.addOrder = async (orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user)=>{
    try{
        const neworder = new Order({
            orderItems:orderItems,
            shippingAddress1:shippingAddress1,
            shippingAddress2:shippingAddress2,
            city:city,
            zip:zip,
            country:country,
            phone:phone,
            status:status,
            totalPrice:totalPrice,
            user:user
        });
        await neworder.save();
        if(!neworder){
            return neworder;
        }
        return null;
    }
    catch(err){
        return null;
    }
}