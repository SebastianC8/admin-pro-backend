/**
 * Route: /api/doctors
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor');

const router = Router();

// get all hospitals
router.get('/', [validateJWT], getDoctors)

// create hospital
router.post('/',
    [
        validateJWT,
        check('name', 'Doctor`s name is a required file.').not().isEmpty(),
        check('hospital', 'Hospital id must be valid').isMongoId(),
        validateFields
    ],
    createDoctor)

// update hospital
router.put('/:id',
    [
        validateJWT,
        check('name', 'Doctor`s name is a required file.').not().isEmpty(),
        check('hospital', 'Hospital id must be valid').isMongoId(),
        validateFields
    ],
    updateDoctor)

// delete hospital
router.delete('/:id', validateJWT, deleteDoctor)

module.exports = router;