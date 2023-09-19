const fs = require('fs')
const MAIN_DIRECTORY = 'uploads';

const getDirectoriesInMainDirectory = (mainDirectory = MAIN_DIRECTORY) => {

    return new Promise((resolve, reject) => {

        try {

            fs.readdir(mainDirectory, (err, files) => {

                if (err) {
                    reject(err);
                }
    
                const directories = files.filter((file) => {
                    return fs.statSync(`${mainDirectory}/${file}`).isDirectory();
                });
    
                if (directories.length > 0) {
                    resolve(directories)
                } else {
                    reject("Empty directory.")
                }
    
            })

        } catch (err) {
            reject(err);
        }

    });

}

module.exports = {
    getDirectoriesInMainDirectory
}