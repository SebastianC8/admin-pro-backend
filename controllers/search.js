const { request, response } = require('express');
const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')

const searchAtAll = async (req = request, res = response) => {

    const searchCriteria = req.params.searchCriteria;
    const regExp = new RegExp(searchCriteria, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regExp }),
        Hospital.find({ name: regExp }),
        Doctor.find({ name: regExp })
    ]);

    res.json({
        ok: true,
        response: {
            users,
            hospitals,
            doctors
        }
    })
}

const searchByCollection = async (req = request, res = response) => {

    const table = req.params.table;
    const searchCriteria = req.params.searchCriteria;
    const regExp = new RegExp(searchCriteria, 'i');

    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({ name: regExp }).populate('user', 'name img').populate('hospital', 'name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regExp }).populate('user', 'name img');
            break;
        case 'users':
            data = await User.find({ name: regExp })
            break;
        default:
            return res.status(400)
                .json({ ok: false, message: 'You must search for one of the following tables: doctors/hospitals/users' })
    }

    res.json({ ok: true, data })

}

module.exports = {
    searchAtAll,
    searchByCollection
}