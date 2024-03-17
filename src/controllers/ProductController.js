const response = require('../utils/responseHelpers');
const {productService}=require('../services');


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
        const {name,image,countInStock} = req.body ;
        if( !name || !image || !countInStock){
            return response.badRequest(res,"Incomplete Product details");
        }

        const newProduct = await productService.addProduct(name,image,countInStock);
        if(!newProduct){
            return response.badRequest(res,"Product cannot be listed");
        }
        return response.success(res,"Producted Listed Successfully", {Product:newProduct});
    }
    catch(error){
        return response.serverError(res, error)
    }
};

module.exports={
    getproduct,
    addProduct
}