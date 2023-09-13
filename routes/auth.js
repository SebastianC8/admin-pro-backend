/**
 * Route: /api/login
 */
const { Router } = require('express')
const { login } = require('../controllers/auth');
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

module.exports = router;