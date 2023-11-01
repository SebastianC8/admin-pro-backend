const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')
const { getMenu } = require('../helpers/menu-client')

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

        res.send({ ok: true, token, menu: getMenu(userBD.role) })

    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, message: error });
    }
}

const loginGoogle = async (req, res = response) => {

    try {
        const googleUser = await googleVerify(req.body.token);
        const { name, email, picture } = googleUser;

        const userBD = await User.findOne({ email });
        let userG;

        if (!userBD) {
            userG = new User({
                name, email, password: '@@@',
                img: picture, isGoogleAccount: true
            });
        } else {
            userG = userBD;
            userG.isGoogleAccount = true;
        }

        await userG.save();

        // generate jwt token
        const token = await generateToken(userG.id)

        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenu(userG.role)
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Google token is not correct."
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const user = await User.findById(uid);

    // generate jwt token
    const token = await generateToken(uid)

    res.send({ ok: true, user, token, menu: getMenu(user.role) })
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}