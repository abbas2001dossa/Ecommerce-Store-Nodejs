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