const { JWT_SECRET } = require("../config");
const jwt=require('jsonwebtoken')
function JwtGenerate(obj){
    var tocken = jwt.sign(obj, JWT_SECRET);
    return tocken
}

module.exports={
    JwtGenerate
}