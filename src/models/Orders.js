const mongoose=require('mongoose');



const orderSchema=  mongoose.Schema({
    orderItems:[{ //since there would be multiple order items therefore an array
        type:mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    },
    totalPrice:{
        type:Number,
        required:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    },
    dateOrdered:{
        type:Date,
        default: Date.now
    }

});

// to send response in api instead of as id as well with _id ! For better frontend ease. 
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON',{
    virtuals:true
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;