/**
 * Route: /api/users
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// get all users
router.get('/', [validateJWT], getUsers)

// create user
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ],
    createUser)

// update user
router.put('/:id',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validateFields
    ],
    updateUser)

// delete user
router.delete('/:id', [validateJWT], deleteUser)

module.exports = router;