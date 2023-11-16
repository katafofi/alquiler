const router = require('express').Router();
const StatusRegisterNegativeController = require('../Controllers/statusRegisterNegative.controler');

//traer informacion
router.get('/',StatusRegisterNegativeController.FindAllStatusRegisterNegative)

// por seguridad se recomienda post -> crear.
router.post('/', StatusRegisterNegativeController.CreateStatusRegisterNegative)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdEstadoRegistroNegativo', StatusRegisterNegativeController.UpdateStatusRegisterNegative )

router.delete('/:IdEstadoRegistroNegativo', StatusRegisterNegativeController.DeleteStatusRegisterNegative)

router.post('/delete/all',StatusRegisterNegativeController.DeleteMultipleStatusRegisterNegative)

router.get('/:IdEstadoRegistroNegativo',StatusRegisterNegativeController.FindOneStatusRegisterNegativeById)

module.exports = router