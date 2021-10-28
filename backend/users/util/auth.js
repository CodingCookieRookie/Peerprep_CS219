const jwt = require('jsonwebtoken')

const accessToken = process.env.ACCESS_TOKEN_SECRET || process.env.DEV_ACCESS_TOKEN_SECRET;

// Define verification mechanism for all non-auth endpoints
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: "Token is required for authentication."});
    }
    
    try {
      jwt.verify(token, accessToken);
    } catch (err) {
        return res.status(401).json({ message: "Invalid/Expired token."});
    }
    return next();
};

module.exports.verifyToken = verifyToken;