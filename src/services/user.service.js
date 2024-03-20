const User = require('../models/User');


exports.registerUser = async (name,email,passwordHash,phone,isAdmin,apartment,zip,city,country,street)=>{
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

exports.getUsers = async ()=>{
    const users =await User.find();
    if(users.length > 0 ){
        return users;
    }
    return null;
}




exports.getUserById= async (id)=>{
    try{
        const user = await user.findById(id);
        if(user){return user;}
        return null;
    }
    catch(err){return null;}
}
