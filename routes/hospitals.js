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
router.get('/', [], getHospitals)

// create hospital
router.post('/',
    [],
    createHospital)

// update hospital
router.put('/:id',
    [],
    updateHospital)

// delete hospital
router.delete('/:id', [], deleteHospital)

module.exports = router;