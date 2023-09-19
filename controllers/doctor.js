const Doctor = require('../models/doctor')
const { request, response } = require('express')

const getDoctors = async (req = request, res = response) => {
    const doctors = await Doctor.find().populate('user', 'name').populate('hospital', 'name');
    res.json({ ok: true, doctors })
}

const createDoctor = async (req = request, res = response) => {
    
    const uid = req.uid;
    const doctor = new Doctor({ user: uid, ...req.body });

    try {
        const newDoctor = await doctor.save();
        res.json({ ok: true, doctor: newDoctor })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }

}

const updateDoctor = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'UPDATE_DOCTOR'
    })
}

const deleteDoctor = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'DELETE_DOCTOR'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}