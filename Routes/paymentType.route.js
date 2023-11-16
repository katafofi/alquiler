const router = require('express').Router();
const PaymentTypeController = require('../Controllers/paymentType.controller');

//traer informacion
router.get('/', PaymentTypeController.FindAllPaymentType)

// por seguridad se recomienda post -> crear.
router.post('/', PaymentTypeController.CreatePaymentType)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdTipoPago',PaymentTypeController.UpdatePaymentType)

router.delete('/:IdTipoPago', PaymentTypeController.DeletePaymentType)

router.post('/delete/all', PaymentTypeController.DeleteMultiplePaymentType)

router.get('/:IdTipoPago', PaymentTypeController.FindOnePaymentTypeById)

module.exports = router