
const zod = require('zod')
const transferSchema = zod.object({
    toAccountId: zod.string(),
    amount: zod.number()
})

module.exports = transferSchema