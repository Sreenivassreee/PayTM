const z = require('zod');

const signInSchema = z.object({
    mail: z.string().email(),
    password: z.string().min(4)

})

module.exports = signInSchema