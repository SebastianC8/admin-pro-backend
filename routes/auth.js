/**
 * Route: /api/login
 */
const { Router } = require('express')
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login)

router.post('/google',
    [
        check('token', 'Google`s token is required.').not().isEmpty(),
        validateFields
    ],
    loginGoogle)

router.get('/renewToken',
    validateJWT,
    renewToken)

module.exports = router;