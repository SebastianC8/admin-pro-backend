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
    
    const id = req.params.id;
    const uid = req.uid;

    try {

        const doctor = Doctor.findById(id);

        if (!doctor) {
            return res.status(400).json({ ok: false, message: 'Doctor not exists.' });
        }

        const params = { ...req.body, user: uid }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, params, { next: true });

        res.json({
            ok: true,
            doctor: updatedDoctor
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error })
    }
}

const deleteDoctor = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(400).json({ ok: false, message: 'D..octor not exists.' })
        }

        await Doctor.findOneAndDelete(id)

        return res.json({
            ok: true,
            message: "Doctor deleted!"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}