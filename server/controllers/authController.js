require('dotenv').config()
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({msg: 'Please enter all the fields.'})
    }

    User.findOne({email})
        .then((user) => {
            if(user) return res.status(400).json({msg: 'User already exists.'})

            const newUser = User({ name, email, password })

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user._id},
                                process.env.jwtSecret,
                                {expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err
                                    res.json({
                                        auth: true,
                                        token,
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({msg: 'Please enter all the fields.'})
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist.'})

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})

                    jwt.sign(
                        {id: user._id},
                        process.env.jwtSecret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err
                            res.json({
                                auth: true,
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
}

module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json({auth: true, user: user}))
}