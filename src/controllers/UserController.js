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
            email:verifyUser.email,
            isAdmin:verifyUser.isAdmin
        };
        const token = await generalService.signToken(tokenObj);
        return response.success(res,"User Login Successful !",{ID:verifyUser.id,Name:verifyUser.name,Email:verifyUser.email, Token:token});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const countUser = async  (req,res)=>{
    try{
        const getCount = await userService.countUser();
        if(!getCount){
            return response.notFound(res,"Users Not Found");
        }
        return response.success(res,"User Count ", {Count:getCount});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const updateUser = async (req,res)=>{
    try{
        const id=req.params.id;
        const {
            name,phone,isAdmin,apartment,zip,city,country,street
        }=req.body;
        console.log(name,phone,isAdmin,apartment,zip,city,country,street);
        // find user
        const findUser= await userService.findUserById(id);
        if(!findUser){
            return response.notFound(res,"User Not Found");
        }

        // update
        const updateUser= await userService.updateUser(id,name,phone,isAdmin,apartment,zip,city,country,street);
        if(!updateUser){
            return response.badRequest(res,"User Cannot Be Updated");
        }
        return response.success(res,"User Updated Successfully ",{User:updateUser});
    }
    catch(err){
        return response.serverError(res,err);
    }
}

const changePassword = async (req,res)=>{
    try{
        console.log("Hello")
        const {email,oldPassword,newPassword}=req.body;

        const findUser = await userService.findUserByEmail(email);
        if(!findUser){
            return response.notFound(res,"User Not Found");
        }

        const verifyUser= await userService.verifyUser(oldPassword,findUser);
        if(!verifyUser){
            return response.badRequest(res,"Incorrect Password ");
        }

        const changePass = await userService.updateUser(findUser,newPassword);
        if(!changePass){
            return response.badRequest(res,"Password Cannot Be Changed");
        }

        return response.success(res,"Password Changed Successfully ",{Email:changePass.email, NewPassword :newPassword})
    }
    catch(err){
        return response.serverError(res,err);
    }
}


const deleteUser= async (req,res)=>{
    try{
        const id=req.params.id;
        const findUser = await userService.findUserById(id);
        if(!findUser){
            return response.notFound(res,"User Not Found");
        }

        const deleteUser = await userService.deleteUser(id);
        if(!deleteUser){
            return response.badRequest("User Cannot Be Deleted");
        } 

        return response.success(res,"User Deleted Successfully ",{User:deleteUser});
    }
    catch(err){
        return response.serverError(res,err);
    }
}



module.exports={
    registerUser,
    getUsers,
    getUserById,
    login,
    countUser,
    updateUser,
    changePassword,
    deleteUser
}


