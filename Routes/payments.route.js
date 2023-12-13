const router = require('express').Router();
const  PaymentsController = require('../Controllers/payments.controller');

//traer informacion
router.get('/',PaymentsController.FindAllPayments)

router.get('/:name', PaymentsController.FindAllPaymentsExport)

// por seguridad se recomienda post -> crear.
router.post('/', PaymentsController.CreatePayments)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdPago', PaymentsController.UpdatePayments)

router.delete('/:IdPago', PaymentsController.DeletePayments)

router.post('/delete/all', PaymentsController.DeleteMultiplePayments)

router.get('/:IdPago', PaymentsController.FindOnePaymentsById)

module.exports = router