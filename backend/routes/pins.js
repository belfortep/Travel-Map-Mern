const router = require('express').Router();

const Pin = require('../models/Pin')

//CREATE 

router.post('/', async (req, res) => {

    const newPin = new Pin(req.body)

    try {

        const savedPin = await newPin.save()

        res.status(200).json(savedPin)

    } catch (err) {
        return res.status(500).json(err)
    }

})


//GET ALL

router.get('/', async (req, res) => {
    try {

        const pins = await Pin.find()

        res.status(200).json(pins)


    } catch (err) {
        return res.status(500).json(err)
    }
})







module.exports = router