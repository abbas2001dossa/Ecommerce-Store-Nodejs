const jwt=require('jsonwebtoken');
require('dotenv/config');

const TOKEN_SECRET=process.env.TOKEN_SECRET;

exports.signToken= async (obj,validity='1d')=>{
    const token = jwt.sign(obj,
        TOKEN_SECRET, 
    {
        expiresIn: validity,
    });
    return token;
}