const { string } = require("zod");
const z =require('zod')
const signUpSchema=z.object({
    firstName:z.string(),
    lastName:z.string(),
    mail:z.string().email(),
    password:z.string().min(4)
})


module.exports=signUpSchema;
