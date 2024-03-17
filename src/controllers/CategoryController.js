const response = require('../utils/responseHelpers');
const {categoryService}=require('../services');


const getCateogries =async (req,res)=>{
    try{
        const categories = await categoryService.getCateogries();
        if(categories){
            return response.success(res,"Categories retrieved Successfully",{Categories:categories});
        }
        return response.notFound(res,"Categories Not Found ");
    }
    catch(error){
        return response.serverError(res,error);
    }
}

const addCategory = async (req,res)=>{
    try{
        const {name,icon,color}=req.body;
        if( !name || !icon || !color){
            return response.badRequest(res,"Incomplete Category details");
        }

        const newCategory = await categoryService.addCategory(name,icon,color);
        if(!newCategory){
            return response.badRequest(res,"Category cannot be created");
        }
        return response.success(res,"Category Listed Successfully", {Category:newCategory});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const deleteCategory=async (req,res)=>{
    try{
        const id=req.params.id; //category id 

        const deleteCategory = await categoryService.deleteCategory(id);
        if(!deleteCategory){
            return response.badRequest(res,"Category Not Present");
        }
        return response.success(res,"Category deleted Successfully !",{Category:deleteCategory});
    }
    catch(error){
        return response.serverError(res,error);
    }
}

const getCategoryById= async (req,res)=>{
    try{
        const id=req.params.id;
        const getCategory = await categoryService.getCategoryById(id);
        if(!getCategory ){
            return response.badRequest(res,"Category Not Present");
        }
        return response.success(res,"Category Found By ID",{Category:getCategory});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const updateCategory= async (req,res)=>{
    try{
        const id = req.params.id;
        const {name,icon,color}=req.body;
        if(!id || !name){
            return response.badRequest(res,"Category Name Not Present");
        }

        const updateCategory= await categoryService.updateCategory(id,name,icon,color);
        if(!updateCategory){
            return response.badRequest(res,"Category Not Present");
        } 
        return response.success(res,"Category Updated Successfuly !",{Category:updateCategory});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    getCateogries,
    addCategory,
    deleteCategory,
    getCategoryById,
    updateCategory
}