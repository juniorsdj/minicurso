const express = require('express')
const User = require('./../model/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('./../config/auth.json')


const generateToken = userId => {
    return jwt.sign(
        { id: userId },
        authConfig.secret,
        { expiresIn: 86400}
    )
}

router.post('/register', async (req, resp) => {
    try {
        const { login } = req.body
        if (await User.findOne({ login }))
            return resp.status(400).send({ error: 'user already exist' })

        const user = await User.create(req.body)
        user.password = undefined
        const token = generateToken(user._id)
        return resp.send({ user, token })
    } catch (err) {
        return resp.status(400).send({ error: "registration failed" })
    }
})

router.post('/authenticate', async (req, resp) => {
    try {
        const { login, password } = req.body
        const user = await User.findOne({ login }).select('+password')
        if (!user)
            return resp.status(400).send({ error: 'user not found' })
        if (!await bcrypt.compare(password, user.password))
            return resp.status(400).send({ error: 'invalid password' })
        user.password = undefined
        token = generateToken(user._id)
        return resp.send({ user, token })
    } catch (err) {
        resp.status(400).send({ error: 'authenticate failed' })
    }

})

module.exports = app => app.use('/auth', router)