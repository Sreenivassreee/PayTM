const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authMiddleware(req, res, next) {
    try {
        
    
    const tocken = req.headers.authorization;
    if (!tocken || !tocken.startsWith("Bearer ")) {
        res.status(403).json({})
    }
    const token=tocken.split(" ")[1]
    const decoded=jwt.verify(token,JWT_SECRET);
    req.userId=decoded._id
    next();
} catch (error) {
 return res.status(403).json({})       
}
}

module.exports=authMiddleware