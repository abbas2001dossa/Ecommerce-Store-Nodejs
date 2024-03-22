const response=require('../utils/responseHelpers');
const { userService,generalService } = require('../services');
const bcrypt=require('bcryptjs');
const passwordUtils = require('../utils/passwordUtils');


const registerUser = async (req,res)=>{
    try{
        const {
            name,email,password,phone,isAdmin,apartment,zip,city,country,street
        }=req.body;
        if(!name || !email || !password || !phone){
            return response.badRequest(res,"Incomplete User Details");
        }

        const userEmail= await userService.findUserByEmail(email);
        if(userEmail){
            return response.badRequest(res,"User Already Present");
        }

        const passwordHash = passwordUtils.generateHash(password);
        const registerUser = await userService.register(
            name,email,passwordHash,phone,isAdmin,apartment,zip,city,country,street
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
        const getUsers= await userService.findUsers();
        if(!getUsers){
            return response.notFound(res,"No Users Found");
        }
        return response.success(res,"Users Retrieved Successfully !", {Users:getUsers});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const getUserById = async (req,res)=>{
    try{
        
        const id = req.params.id;
        const getUserById = await userService.findUserById(id);
        if(!getUserById){
            return response.notFound(res,"User Not Found");
        }
        return response.success(res,"User Retrieved Successfully By Id !",{User:getUserById});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const login = async (req,res)=>{
    try{
        const {password,email}=req.body;
        if(!password || !email){
            return response.badRequest(res,"Incomplete User Details");
        }

        const findUser = await userService.findUserByEmail(email);
        if(!findUser){
            return response.notFound(res,"User Cannot Be Found");
        }

        const verifyUser= await userService.verifyUser(password,findUser);
        if(!verifyUser){
            return response.badRequest(res,"Invalid Password ");
        }
        let tokenObj = {
            userId:verifyUser.id,
            email:verifyUser.email
        };
        const token = await generalService.signToken(tokenObj);
        return response.success(res,"User Login Successful !",{Name:verifyUser.name,Email:verifyUser.email, Token:token});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

module.exports={
    registerUser,
    getUsers,
    getUserById,
    login
}


