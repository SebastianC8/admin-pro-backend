const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')
const fs = require('fs')

const updateImage = async (type, id, filename) => {

    const pathImg = `./uploads/${type}`;
    let result = "";

    switch (type) {

        case 'doctors':
            return await updateDoctorImage(pathImg, id, filename);
        break;
            
        case 'hospitals':

            break;

        case 'users':
            break;

        default:
            break;

    }
}

const updateDoctorImage = async (pathImg, id, filename) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return false;
    }

    oldPath = `${pathImg}/${doctor.img}`;

    // delete current img
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }

    doctor.img = filename;
    await doctor.save();
    return true;

}

module.exports = {
    updateImage
}