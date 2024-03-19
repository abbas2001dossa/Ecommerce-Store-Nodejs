const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        required:false,
        default: ''
    },
    image:{
        type:String,
        required:false,
        default: ''
    },
    images:[{
        type:String,
        required:false,

    }],
    brand:{
        type:String,
        required:false,
        default: ''
    },
    price:{
        type:Number,
        required:false,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        required:false,
        default:0
    },
    numOfReviews:{
        type:Number,
        required:false,
        default:0
    },
    isFeatured:{
        type:Boolean,
        required:false,
        default:false
    },
    dateCreated:{
        type:Date,
        required:false,
        default: Date.now
    }
});


// to send response in api instead of as id as well with _id ! For better frontend ease. 
ProductsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ProductsSchema.set('toJSON',{
    virtuals:true
});


const Product = mongoose.model("Product",ProductsSchema);
module.exports = Product;