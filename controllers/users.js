const User = require('../models/user')
const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helpers/jwt')

const getUsers = async (req = request, res = response) => {
    
    const pFrom = Number(req.query.from) || 0;
    const pTo = Number(req.query.limit) || 5;

    // Several promises
    const [users, total] = await Promise.all([
        User.find({}, 'name email role isGoogleAccount').skip(pFrom).limit(pTo),
        User.count()
    ]);

    res.json({ ok: true, users, total })
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExists = await User.find({ email })

        if (emailExists.length > 0) {
            return res.status(500).json({ ok: false, message: 'Email already exists' })
        }

        const user = new User(req.body);

        // crypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        // save user
        await user.save()

        // generate jwt token
        const token = await generateToken(user.id)

        res.send({ ok: true, user, token })

    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }

}

const updateUser = async (req = request, res = response) => {
    
    //TODO: Validate token
    
    const uid = req.params.id

    try {    

        const userDB = await User.findById(uid)

        if (!userDB) {
            return res.status(404).json({ ok: false, message: 'User no exists' })
        }

        const { password, isGoogleAccount, email, ...fields } = req.body

        if (email !== userDB.email) {
            const userExists = await User.findOne({ email })
            if (userExists) {
                return res.status(400).json({ ok: false, message: 'There is already a user with that email.' })
            }
        }

        fields.email = email;
        // Return old object by default
        // Must set up to return the new object
        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true })

        res.json({
            ok: true,
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }
}

const deleteUser = async(req, res) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid)

        if (!userDB) {
            return res.status(404).json({ ok: false, message: 'User no exists' })
        }
        
        await User.findOneAndDelete(uid)

        return res.json({
            ok: true,
            message: "User deleted!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}