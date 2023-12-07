const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'assets'),
    filename: (req, file, cb) => {
        const fileNameFotoDocumento = `FotoDocumento_${req.body.Cedula}_${req.body.Nombre}${path.extname(file.originalname)}`;
        const fileNameFotoServicioPublico = `FotoServicioPublico_${req.body.Cedula}_${req.body.Nombre}${path.extname(file.originalname)}`;
        cb(null, fileNameFotoDocumento, fileNameFotoServicioPublico);
    }
})

const upload = multer({ storage })

module.exports = upload