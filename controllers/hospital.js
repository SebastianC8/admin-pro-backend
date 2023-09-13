const Hospital = require('../models/hospital')
const { request, response } = require('express')

const getHospitals = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'GET_HOSPITALS'
    })
}

const createHospital = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'CREATE_HOSPITAL'
    })
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