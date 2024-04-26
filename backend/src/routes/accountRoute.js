const express = require('express')
const Account = require('../models/accountModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
router.post('/transfore', async (req, res) => {
    const fromAccountId = '';
    const toAccountId = '';
    await Account.findByIdAndUpdate(fromAccountId, { $inc: { balence: -amount } })
    await Account.findByIdAndUpdate(toAccountId, { $inc: { balence: amount } })
})
router.get("/balence", authMiddleware, async (req, res) => {
    try {
        const balence = await Account.findOne({ userId: req.userId })
        console.log(balence)
        return res.status(200).json({ balence: balence.balance })
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong", error })
    }
})
module.exports = router