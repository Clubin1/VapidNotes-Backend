const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const app = express()

// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')
// Load loan file
// @route POST api/users/register
// @desc Register user
// @access public

router.post('/register', (req, res) => { // Form validation
    const {errors, isValid} = validateRegisterInput(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'})
        } else {
            const newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password, studentAcc: req.body.studentAcc, homeAcc: req.body.homeAcc, personalAcc: req.body.personalAcc, creditScore: req.body.creditScore, bankSum: req.body.bankSum, reasonVisit: req.body.reasonVisit, levelExp: req.body.levelExp})

            // Hash password before saving in db
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) 
                        throw err
                    newUser.password = hash
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                })
            })
        }
    })
})

// @route POST api/users/update
// @desc update user fields and get user ID
// @access public
router.get("/settings/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
      res.json(user);
    });
});
  
router.post("/settings/:id", (req,res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
      if (!user) {
        res.status(404).send("user not found");
      } else {
        user.name = req.body.name
        user.email = req.body.email
        user.bankAccount = req.body.bankAccount
        user.bankSum = req.body.bankSum
        user.levelExp = req.body.levelExp
        user.creditScore = req.body.creditScore
        user
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((err) => res.status(500).send(err.message));
      }
    });
})


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => { // Form validation
    const {errors, isValid} = validateLoginInput(req.body)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // Find user by email
    User.findOne({email}).then(user => { // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"})
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) { 
                // User matched, create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    creditScore: user.creditScore,
                    studentAcc: user.studentAcc,
                    personalAcc: user.personalAcc,
                    homeAcc: user.homeAcc,
                    bankAccount: user.bankAccount,
                    bankSum: user.bankSum,
                    reasonVisit: user.reasonVisit,
                    levelExp: user.levelExp
                }
                // Sign token
                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 31556926 // 1 year in seconds
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json({passwordincorrect: "Password incorrect"})
            }
        })
    })
})
module.exports = router;
