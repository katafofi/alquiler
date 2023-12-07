const bufferToFile = async (buffer, filepath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, buffer, 'binary', (err) => {
            err ? reject(err) : resolve(filepath)
        })
    })
}

module.exports = bufferToFile