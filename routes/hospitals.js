/**
 * Route: /api/hospitals
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');

const router = Router();

// get all hospitals
router.get('/', [validateJWT], getHospitals)

// create hospital
router.post('/',
    [
        validateJWT,
        check('name', 'Hospital`s name is required').not().isEmpty(),
        validateFields
    ],
    createHospital)

// update hospital
router.put('/:id',
    [
        validateJWT,
        check('name', 'Hospital`s name is required').not().isEmpty(),
        validateFields
    ],
    updateHospital)

// delete hospital
router.delete('/:id',
    validateJWT,
    deleteHospital)

module.exports = router;