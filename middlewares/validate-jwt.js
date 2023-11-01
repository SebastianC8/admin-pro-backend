const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        res.status(401).json({
            ok: false,
            message: 'There is not a token in request.'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        //middleware can modify the request object before come to controller method
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Incorrect token'
        })
    }

}

const validateAdminRole = async (req, res, next) => {
    
    const uid = req.uid;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({ ok: false, message: "User doesn't exist" });
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ ok: false, message: "User has not permissions" });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error })
    }
}

const validateIfIsAdminRoleOrItIsMyUser = async (req, res, next) => {
    
    const uid = req.uid;
    const id = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({ ok: false, message: "User doesn't exist" });
        }

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({ ok: false, message: "User has not permissions" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error })
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateIfIsAdminRoleOrItIsMyUser
}