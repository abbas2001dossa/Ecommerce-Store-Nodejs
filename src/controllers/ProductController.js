const response = require('../utils/responseHelpers');
const {productService}=require('../services');
const {categoryService}=require('../services');


const getproduct = async (req,res)=>{

    try{
        const products = await productService.getProducts();
        if(products){
            return response.success(res,"Products retrieved Successfully",{Products:products});
        }
        return response.notFound(res,"Products Not Found ");
    }
    catch(error){
       return response.serverError(res, error)
    }
};


const addProduct = async (req,res)=>{
    try{
        const {
            name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured
        } 
        = req.body ;
        
        if( !name || !description || !category || !countInStock){
            return response.badRequest(res,"Incomplete Product details");
        }

        const findCategory= await categoryService.getCategoryById(category);
        if(!findCategory){
            return response.badRequest(res,"Category Not Found");
        }

        const newProduct = await productService.addProduct(
            name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured
        );
        if(!newProduct){
            return response.badRequest(res,"Product Cannot Be Created");
        }
        return response.success(res,"Producted Created Successfully", {Product:newProduct});
    }
    catch(error){
        return response.serverError(res, error)
    }
}


const getProductById = async (req,res)=>{
    try{
        const id = req.params.id;
        const getProduct = await productService.getProductById(id);
        if(!getProduct){
            return response.badRequest(res,"Product Not Found");
        }
        return response.success(res,"Product Found Successfully",{Product:getProduct});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    getproduct,
    addProduct,
    getProductById
}