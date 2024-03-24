const mongoose=require('mongoose');


const orderItemSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

// to send response in api instead of as id as well with _id ! For better frontend ease. 
orderItemSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderItemSchema.set('toJSON',{
    virtuals:true
});


const OrderItem = mongoose.model('OrderItem',orderItemSchema);
module.exports = OrderItem;