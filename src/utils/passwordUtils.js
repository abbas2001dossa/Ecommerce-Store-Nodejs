// In a separate file, e.g., utils/passwordUtils.js
const bcrypt=require('bcrypt');
require('dotenv/config');

const PASSWORD_SALT= process.env.PASSWORD_SALT;

exports.generateHash = (password) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    catch(err){
        console.log(err);
    }
};

exports.comparePassword = (password, hashedPassword) => {
    
    return bcrypt.compareSync(password, hashedPassword);
};
