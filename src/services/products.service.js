const Product = require('../models/Products');
const response=require('../utils/responseHelpers');


// add product function
exports.addProduct= async (name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured)=>{
    try{
        const newProduct = new Product ({
            name:name,
            description:description,
            richDescription:richDescription,
            image:image,
            brand:brand,
            price:price,
            category:category,
            countInStock:countInStock,
            rating:rating,
            numOfReviews:numOfReviews,
            isFeatured:isFeatured
        });
        await newProduct.save();

        if(newProduct){return newProduct;}
        return null;
    }
    catch(err){
        console.log(err);
        return null;
    }
}


exports.getProducts = async ()=>{
    const products =await Product.find();
    if(products.length > 0 ){
        return products;
    }
    return null;
}

exports.getProductById= async (id)=>{
    try{
        const product = await Product.findById(id);
        if(product){return product;}
        return null;
    }
    catch(err){return null;}
}