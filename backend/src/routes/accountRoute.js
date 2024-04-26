const express = require('express')
const Account = require('../models/accountModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
const zod = require('zod');
const User = require('../models/userModel');
const transferSchema = require('../zod/transfer');

router.post('/transfer', authMiddleware, async (req, res) => {
    try {


        const { success, error } = transferSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid Input", error:error.message })
        }

        const userAccount = await Account.findOne({ userId: req.userId })
        if ((req.body.amount > userAccount.balance)) {
            return res.status(400).json({ message: "Insufficient balence" })
        }

        const toAccount = await User.findOne({ _id: req.body.toAccountId });


        if (!toAccount._id) {
            return res.status(400).json({ message: "Invalid Account" })
        }
        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -req.body.amount
            }
        })

        await Account.updateOne({
            userId: req.body.toAccountId 
        }, {
            $inc: {
                balance: req.body.amount
            }
        })
        res.json({
            message: "Transfer successful"
        })

    } catch (error) {
        return res.json({
            message: error.message
        })


    }
    // const fromAccount = await Account.findByIdAndUpdate(fromAccountId, { $inc: { balence: -amount } })
    // const toAccount = await Account.findByIdAndUpdate(toAccountId, { $inc: { balence: amount } })
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