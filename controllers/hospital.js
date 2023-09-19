const Hospital = require('../models/hospital')
const { request, response } = require('express')

const getHospitals = async (req = request, res = response) => {

    const hospitals = await Hospital.find().populate('user', 'name img');

    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async (req = request, res = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital({ user: uid, ...req.body });

    try {
        const newHospital = await hospital.save();
        res.json({ ok: true, hospital: newHospital })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }

}

const updateHospital = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'UPDATE_HOSPITAL'
    })
}

const deleteHospital = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'DELETE_HOSPITAL'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}