/**
 * Route: /api/login
 */
const { Router } = require('express')
const { login, loginGoogle } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

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

module.exports = router;