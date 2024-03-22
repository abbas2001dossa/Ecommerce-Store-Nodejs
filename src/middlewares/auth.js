const jwt=require('jsonwebtoken');
const response = require('../utils/responseHelpers');
const TOKEN_SECRET=process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    var token = req.headers['authorization']; 
    if (!token) {
        return response.authError(res,"Authorization Token is required for further processing")
    }
     // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded;
        
    } catch (error) {
        return response.authError(res, "Unauthorized - " + error.message);
    }
    return next();
}

module.exports = verifyToken;