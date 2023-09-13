const jwt = require('jsonwebtoken')

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

module.exports = {
    validateJWT
}