const express = require('express')
const router = express.Router()
const zod = require('zod')
const signUpSchema = require('../zod/signUp')
const User = require('../models/userModel')
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')
router.get("/", async (req, res) => {
   try {
      const { firstName, lastName, mail, password } = req.body;
      const result = signUpSchema.safeParse(req.body)
      if (!result.success) {
         return res.status(
            411
         ).json({
            message: "Invalid Inputs"
         })
      }
      const existingUser = await User.findOne({ mail })
      if (existingUser) {
         return res.status(200).json({
            message: "User Already Exist"
         })
      }
      const createdUser = await User.create({ firstName, lastName, mail, password })
      createdUser.password=null
      console.log(JSON.stringify(createdUser ))
      var token = jwt.sign({ firstName:createdUser.firstName, lastName:createdUser.lastName, mail, _id:createdUser._id}, JWT_SECRET);

      console.log(token)

      return res.json({ token })
   } catch (e) {
      return res.status(400).json({ message: e.message })
   }
})


module.exports = router;