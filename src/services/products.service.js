const Product = require('../models/Products');

exports.addProduct= async (name,image,countInStock)=>{
    const newProduct = new Product ({
        name:name,
        image:image,
        countInStock:countInStock
    });
    await newProduct.save();

    if(newProduct){return newProduct;}
    return null;
}


exports.getProducts = async ()=>{
    const products =await Product.find();
    if(products.length > 0 ){
        return products;
    }
    return null;
}
