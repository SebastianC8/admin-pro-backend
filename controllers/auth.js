const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helpers/jwt')

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // check email
        const userBD = await User.findOne({ email })

        if (!userBD) {
            return res.status(404).json({ ok: false, message: 'Email is not valid' })
        }

        //check password
        const validPassword = bcrypt.compareSync(password, userBD.password)

        if (!validPassword) {
            return res.status(400).json({ ok: false, message: 'Password is not valid' })
        }

        // generate jwt token
        const token = await generateToken(userBD.id)

        res.send({ ok: true, token })

    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, message: error });
    }
}

module.exports = { login }