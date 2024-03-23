const User = require('../models/User');
const passwordUtils=require('../utils/passwordUtils');

exports.register = async (name,email,passwordHash,phone,isAdmin,apartment,zip,city,country,street)=>{
    try{
        const newUser = new User({
            name:name?name:null,
            email:email?email:null,
            passwordHash:passwordHash?passwordHash:null,
            phone:phone?phone:null,
            isAdmin:isAdmin?isAdmin:null,
            street:street?street:null,
            apartment:apartment?apartment:null,
            zip:zip?zip:null,
            city:city?city:null,
            country:country?country:null
        });
        await newUser.save();
        if(newUser){return newUser;}
        return null;
    }
    catch(err){
        return null;
    }
};  

exports.findUsers = async ()=>{
    const users =await User.find().select('-passwordHash');
    if(users.length > 0 ){
        return users;
    }
    return null;
}


exports.findUserByEmail = async (email)=>{
    try{
        const user = await User.findOne({ email: email });
        if(user){return user;}
        return null;
    }
    catch(err){
        return null
    }
}

exports.findUserById= async (id)=>{
    try{
        const user = await User.findById(id).select('-passwordHash');
        console.log(user);
        if(user){return user;}
        return null;
    }
    catch(err){return null;}
}


exports.verifyUser = async (password,findUser)=>{
    try{    
        if(passwordUtils.comparePassword(password,findUser.passwordHash)){
            return findUser;
        }
        return null;
    }
    catch(err){
        return null;
    }
}

exports.countUser = async ()=>{
    try{
        const countU = await User.countDocuments({});
        
        if(countU){
            return countU;
        }
        return null;
    
    }
    catch(err){
        return null;
    }
}

exports.updateUser = async (id,name,phone,isAdmin,apartment,zip,city,country,street)=>{
    try{
        const update = await User.findByIdAndUpdate(
        id,
        {
            name:name,
            phone:phone,
            isAdmin:isAdmin,
            street:street,
            apartment:apartment,
            zip:zip,
            city:city,
            country:country
        },
        {new:true}        
        ).select('-passwordHash');

        if(update){return update;}
        return null;
    }
    catch(err){
        return null;
    }
}


// update password
const updatePassword =async (findUser,newPassword)=>{
    try{
        const passwordHash = passwordUtils.generateHash(newPassword);
        const updateUser = await User.findByIdAndUpdate(
            findUser.id,
            {
                passwordHash:passwordHash
            },
            {new:true}
        );

        if(updateUser){return updateUser;}
        return null;
    }
    catch(err){
        return null;
    }
}

const deleteUser= async (id)=>{
    try{
        const del = await User.findByIdAndDelete(id);
        if(del){return del;}
        return null;
    }
    catch(err){return null;}
}