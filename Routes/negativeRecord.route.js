const router = require('express').Router();
const NegativeRecordController = require('../Controllers/negativeRecord.controller');

//traer informacion
router.get('/',NegativeRecordController.FindAllNegativeRecord)

// por seguridad se recomienda post -> crear.
router.post('/', NegativeRecordController.CreateNegativeRecord)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdRegistroNegativo', NegativeRecordController.UpdateNegativeRecord )

router.delete('/:IdRegistroNegativo', NegativeRecordController.DeleteNegativeRecord)

router.post('/delete/all', NegativeRecordController.DeleteMultipleNegativeRecord)

router.get('/:IdRegistroNegativo', NegativeRecordController.FindOneNegativeRecordById)

module.exports = router