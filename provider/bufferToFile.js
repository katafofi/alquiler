const fs = require('fs');

const bufferToFile = async (buffer, filepath) => {
    console.log(buffer)
    console.log(filepath)
    return await filepath
    /* return new Promise((resolve, reject) => {
        fs.writeFile(filepath, buffer, null, (err) => {
            err ? reject(err) : resolve(filepath)
        })
    }) */
}

module.exports = bufferToFile