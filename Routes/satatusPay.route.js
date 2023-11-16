const router = require('express').Router();
const StatusPayController = require('../Controllers/status_pay.controller');

//traer informacion
router.get('/', StatusPayController.FindAllStatusPay)

// por seguridad se recomienda post -> crear.
router.post('/', StatusPayController.CreateStatusPay)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdEstadoPago',StatusPayController.UpdateStatusPay)

router.delete('/:IdEstadoPago', StatusPayController.DeleteStatusPay)

router.post('/delete/all', StatusPayController.DeleteMultipleStatusPay)

router.get('/:IdEstadoPago', StatusPayController.FindOneStatusPayById)

module.exports = router