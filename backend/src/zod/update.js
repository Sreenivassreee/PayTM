const z = require('zod')

const updateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
})

module.exports={
    updateSchema
}