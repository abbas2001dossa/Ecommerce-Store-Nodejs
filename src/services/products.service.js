const { categoryService } = require('.');
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
    const products =await Product.find().populate('category');
    if(products.length > 0 ){
        return products;
    }
    return null;
}




exports.getProductById= async (id)=>{
    try{
        const product = await Product.findById(id).populate('category');
        if(product){return product;}
        return null;
    }
    catch(err){return null;}
}



exports.updateProduct= async (id,name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured)=>{
    try{
        const update = await Product.findByIdAndUpdate(
            id,
            {
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
            },
            {new:true}
        ).populate('category');
        if(update){
            return update;
        }
        return null;
    }
    catch(err){
        return null;
    }
}



exports.deleteProduct = async (id)=>{
    try{
       const deleteProduct = await Product.findByIdAndDelete(id).populate('category');
       if(deleteProduct){return deleteProduct;}
       return null; 
    }
    catch(err){
        return null;
    }
}


exports.countProduct = async ()=>{
    try{
        const countP = await Product.countDocuments({});
        
        if(countP){
            return countP;
        }
        return null;
    
    }
    catch(err){
        return null;
    }
}


exports.featuredproducts = async (count)=>{
    const featured = await Product.find({isFeatured:true}).limit(count);
    if(featured){
        return featured;
    }
    return null;
}

exports.findProductByCategories= async (filter)=>{
    try{
        const productsList = await Product.find(filter).populate('category'); // fulll array of category would be shown with populate 
        if(productsList){return productsList;}
        return null;
    }
    catch(err){return null;}
}