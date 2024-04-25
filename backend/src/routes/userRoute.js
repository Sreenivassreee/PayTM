const express = require('express')
const router = express.Router()
const zod = require('zod')
const signUpSchema = require('../zod/signUp')
const User = require('../models/userModel')
const { JwtGenerate } = require('../utils/jwtGenerate')
const signInSchema = require('../zod/signIn')
router.post("/signup", async (req, res) => {
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
      createdUser.password = null
      var token = JwtGenerate({ firstName: createdUser.firstName, lastName: createdUser.lastName, mail, _id: createdUser._id });


      return res.json({ token })
   } catch (e) {
      return res.status(400).json({ message: e.message })
   }
})


router.post("/signIn", async (req, res) => {
   try {
      const { mail, password } = req.body;
      const user = await User.findOne({ mail })
      const validate = signInSchema.safeParse(req.body)
      if (!validate.success) {
         return res.status(400).json({ message: validate.error})
      }

      if (!user) {
         return res.status(411).json({ message: "User Not Found" })
      }

      if (user.password == password) {
         var tocken = JwtGenerate({ firstName: user.firstName, lastName: user.lastName, mail, _id: user._id });
         return res.status(200).json({ tocken })
      } else {
         return res.status(411).json({ message: "Error while logging in" })
      }
   } catch (e) {
      return res.status(400).json({ message: e.message })
   }
})

module.exports = router;