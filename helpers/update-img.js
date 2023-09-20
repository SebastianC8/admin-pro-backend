const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')
const fs = require('fs')

const updateImage = async (type, id, filename) => {

    const pathImg = `./uploads/${type}`;

    switch (type) {

        case 'doctors':
            return await updateDoctorImage(pathImg, id, filename);
            
        case 'hospitals':
            return await updateHospitalImage(pathImg, id, filename);

        case 'users':
            return await updateUserImage(pathImg, id, filename);

        default:
            return false;

    }
}

const updateDoctorImage = async (pathImg, id, filename) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return false;
    }

    const oldPath = `${pathImg}/${doctor.img}`;

    // delete current img
    deleteImage(oldPath);

    doctor.img = filename;
    await doctor.save();
    return true;

}

const updateHospitalImage = async (pathImg, id, filename) => {
    
    const hospital = await Hospital.findById(id);

    if (!hospital) {
        return false;
    }

    const oldPath = `${pathImg}/${hospital.img}`;

    // delete current img
    deleteImage(oldPath);

    hospital.img = filename;
    await hospital.save();
    return true;
}

const updateUserImage = async (pathImg, id, filename) => {

    const user = await User.findById(id);

    if (!user) {
        return false;
    }

    const oldPath = `${pathImg}/${user.img}`;

    //delete img
    deleteImage(oldPath);

    user.img = filename;
    await user.save();
    return true;
}

const deleteImage = (path) => (fs.existsSync(path)) && (fs.unlinkSync(path));

module.exports = {
    updateImage
}