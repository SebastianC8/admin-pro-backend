const { v4: uuidv4 } = require('uuid');
const { request, response } = require('express');
const { updateImage } = require('../helpers/update-img');
const { getDirectoriesInMainDirectory } = require('../helpers/get-directories');

const fileUpload = async(req = request, res = response) => {
    
    const type = req.params.type;
    const id = req.params.id;
    const allowedTypes = await getDirectoriesInMainDirectory();

    // check if type is allowed
    if (allowedTypes && !allowedTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            message: 'This type isn`t allowed.'
        });
    }

    // check if exists file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No files were uploaded'
        });
    }

    // process file
    const file = req.files.img;
    const fileExt = file.name.split('.').pop();
    const allowedExt = ['JPG', 'JPEG', 'PNG', 'GIF'];

    // check file extension
    if (!allowedExt.includes(fileExt.toUpperCase())) {
        return res.status(400).json({
            ok: false,
            message: 'File extension is not allowed.'
        });
    }

    // generate file's name
    const filename = `${uuidv4()}.${fileExt}`;

    // path to save file
    const path = `./uploads/${type}/${filename}`;

    // move img
    file.mv(path, async (err) => {
        
        if (err) {
            console.log(err);
            return res.status(500).json({ ok: false, message: err });
        }

        // update bd
        const changeImg = await updateImage(type, id, filename);

        if (changeImg) {
            res.json({ ok: true, message: 'File uploaded.', filename })
        } else {
            res.status(500).json({ ok: false, message: 'File was not uploaded.' })
        }


    })

}

module.exports = {
    fileUpload
}