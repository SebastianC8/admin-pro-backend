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
    
    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({ ok: false, message: 'Id is not exist.' })
        }

        const params = { ...req.body, user: uid }
        const updatedHospital = await Hospital.findByIdAndUpdate(id, params, { new: true });

        res.json({
            ok: true,
            hospital: updatedHospital
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }
}

const deleteHospital = async (req = request, res = response) => {
    
    const id = req.params.id;

    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({ ok: false, message: 'Hospital not exists.' })
        }

        await Hospital.findOneAndDelete(id)

        return res.json({
            ok: true,
            message: "Hospital deleted!"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, message: error })
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}