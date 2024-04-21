const Order = require("../models/Orders");

exports.getOrder = async () => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ dateOrdered: -1 });
    if (orders.length > 0) {
      return orders;
    }
    return null;
  } catch (err) {
    return null;
  }
};

//post reqest data would be in the form
// {
//     "orderItems":[
//         {
//             "quantity":3,
//             "product":"5f436234hgi4hyvbiviy452"
//         },
//         {
//             "quantity":5,
//             "product":"gfbvasbyddvfyvsayivyi34jbdfj"
//         }
//     ],
//     "shippingAddress1":"Flowers 1st street ",
//     "shippingAddress2":"Flowers 2nd street ",
//     "city":"Prague",
//     "zip":4343,
//     "country":"Pakistan",
//     "phone":,
//     "user":"342565jg4hvy64vyv1376v5iv"

// }

exports.addOrder = async (
  OrderItemsResolved,
  shippingAddress1,
  shippingAddress2,
  city,
  zip,
  country,
  phone,
  status,
  totalPrice,
  user
) => {
  try {
    const newOrder = new Order({
      orderItems: OrderItemsResolved,
      shippingAddress1: shippingAddress1,
      shippingAddress2: shippingAddress2,
      city: city,
      zip: zip,
      country: country,
      phone: phone,
      status: status,
      totalPrice: totalPrice,
      user: user,
    });
    await newOrder.save();
    if (newOrder) {
      return newOrder;
    }
    return null;
  } catch (err) {
    return null;
  }
};

exports.getOrderById = async (id) => {
  try {
    const getOrder = await Order.findById(id)
      .populate("user", "name email")
      .populate({
        path: "orderItems",
        populate: { 
            path: "product", populate: "category" 
        },
      });
    if (getOrder) {
      return getOrder;
    }
    return null;
  } catch (err) {
    return null;
  }
};


exports.updateStatus= async (id,status)=>{
    try{
        const updateO = await Order.findByIdAndUpdate(
            id,
            {
                status:status
            },
            {new:true}
        );
        if(updateO){return updateO;}
        return null;    
    }
    catch(err){
        return null;
    }
}

exports.delete=async (id)=>{
    try{
        const del= await Order.findByIdAndDelete(id);
        if(del){return del;}
        return null;
    }
    catch(err)
    {
        return null;
    }
}

exports.totalSales=async ()=>{
    try{
        const sales = await Order.aggregate([  //aggregate() method allows you to process data records and return computed results.
            {$group: {_id:null, totalSales: {$sum :'$totalPrice'}}} // if u remove _id - will get an error , since mongoose cannot send without id 
        ]);
        if(sales){return sales;}
        return null;
    }
    catch(err){
        return null;
    }
}

exports.getCount = async ()=>{
  try{
      const c = Order.countDocuments({});
      if(c){return c;}
      return null;
  }
  catch(err){
    return null;
  }
}