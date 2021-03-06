const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
//Register

router.post('/register', async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save()

        res.status(200).json({ username: user.username, email: user.email, id: user._id })

    } catch (err) {
        return res.status(500).json(err)
    }

})



//Login

router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(400).json('Wrong credentials')
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(400).json('Wrong credentials')
        }

        res.status(200).json({ _id: user._id, username: user.username })



    } catch (err) {
        return res.status(500).json(err)
    }
})





module.exports = router