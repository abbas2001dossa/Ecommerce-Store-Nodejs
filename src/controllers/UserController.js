const response=require('../utils/responseHelpers');
const { userService } = require('../services');
const bcrypt=require('bcryptjs');
require('dotenv/config');

const registerUser = async (req,res)=>{
    try{
        const {
            name,email,password,phone,isAdmin,apartment,zip,city,country,street
        }=req.body;
    
        if(!name || !email || !password || !phone){
            return response.badRequest(res,"Incomplete User Details");
        }

        const PASSWORD_SALT= process.env.PASSWORD_SALT;
        const registerUser = await userService.registerUser(
            name,email,
            bcrypt.hashSync(password, PASSWORD_SALT), //adding salt - should this be in another component ??
            phone,isAdmin,apartment,zip,city,country,street
        );
        if(!registerUser)
        {
            return response.badRequest(res,"User Cannot Be Registered");
        }
        return response.success(res,"User Registered Successfully !", {User:registerUser});
    
    
    }   
    catch(err){
        return response.serverError(res,err);
    }
}


const getUsers= async (req,res)=>{
    try{
        const getUsers= await userService.getUsers();
        if(!getUsers){
            return response.badRequest(res,"No Users Found");
        }
        return response.success(res,"Users Retrieved Successfully !", {Users:getUsers});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    registerUser,
    getUsers
}


