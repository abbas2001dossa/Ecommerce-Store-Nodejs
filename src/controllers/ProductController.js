const response = require('../utils/responseHelpers');
const {productService}=require('../services');
const {categoryService}=require('../services');


const getproduct = async (req,res)=>{
    try{
        // to get products with respect to query params of - categories 
        let filter={};
        if(req.query.categories){
            filter={category : req.query.categories.split(',')}
            const filteredList = await productService.findProductByCategories(filter);
            if(!filteredList){
                return response.badRequest(res,"Filtered Categories Cannot be Found ");
            }
            return response.success(res,"Filtered Products By Categories Found",{Products:filteredList});
        }

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

const updateProduct= async (req,res)=>{
    try{
        const {
            name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured
        } 
        = req.body ;
        const id= req.params.id;
        
        if(!name && !description && !richDescription && !image && !brand && !price && !category && !countInStock && !rating && !numOfReviews && !isFeatured){
            return response.badRequest(res,"No Product Details Found");
        }

        if(category){
            const findCategory= await categoryService.getCategoryById(category);
            if(!findCategory){
                return response.badRequest(res,"Category Not Found");
            }
        }

        const updateProduct = await productService.updateProduct(
            id,name,description,richDescription,image,brand,price,category,countInStock,rating,numOfReviews,isFeatured            
        );
        if(!updateProduct){
            return response.badRequest(res,"Product Not Found ");
        }
        return response.success(res,"Product Updated Successfully",{Product:updateProduct});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        const deleteProduct = await productService.deleteProduct(id);
        if(!deleteProduct){
            return response.badRequest(res,"Product Cannot Be Found");
        }
        return response.success(res,"Product Deleted Successfully",{Product:deleteProduct});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const countProducts = async (req,res)=>{
    try{
    
        const getCount = await productService.countProduct();
        if(!getCount){
            return response.badRequest(res,"Products Not Found");
        }
        return response.success(res,"Product Count ", {Count:getCount});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const featuredProducts = async (req,res)=>{
    try{
        const count = req.params.count ? req.params.count : 0 ;

        const getFeatured = await productService.featuredproducts(count);
        if(!getFeatured){
            return response.badRequest(res,"Featured Products Not Found");
        }
        return response.success(res,"Featured Products Found",{FeaturedProducts:getFeatured});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    getproduct,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    countProducts,
    featuredProducts
}