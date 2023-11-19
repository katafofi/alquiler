const router = require('express').Router();
const RentingRefuntController = require('../Controllers/rentalrefund.controller');

//traer informacion
router.get('/', RentingRefuntController.FindAllRentingRefunt)

// por seguridad se recomienda post -> crear.
router.post('/', RentingRefuntController.CreateRentingRefunt)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdRegistroDevolucion', RentingRefuntController.UpdateRentingRefunt )

router.delete('/:IdRegistroDevolucion', RentingRefuntController.DeleteRentingRefunt)

router.post('/delete/all', RentingRefuntController.DeleteMultipleRentingRefunt)

router.get('/:IdRegistroDevolucion', RentingRefuntController.FindOneRentingRefuntById)

module.exports = router