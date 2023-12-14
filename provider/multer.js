const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'assets'),
    filename: (req, file, cb) => {
        const baseFileName = `${req.body.Cedula}_${req.body.Nombre}`;
        const fileNameFotoDocumento = `FotoDocumento_${baseFileName}${path.extname(file.originalname)}`;
        const fileNameFotoServicioPublico = `FotoServicioPublico_${baseFileName}${path.extname(file.originalname)}`;
        
        if (file.fieldname === 'FotoDocumento') {
            cb(null, fileNameFotoDocumento);
        } else if (file.fieldname === 'FotoServicioPublico') {
            cb(null, fileNameFotoServicioPublico);
        } else {
            cb(null, file.originalname);
        }
    }
})

const upload = multer({ storage })

module.exports = upload