const router = require('express').Router();
const RentingController = require('../Controllers/renting.controller');

//traer informacion
router.get('/', RentingController.FindAllRenting)

// por seguridad se recomienda post -> crear.
router.post('/', RentingController.CreateRenting)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdAlquiler', RentingController.UpdateRenting )

router.delete('/:IdAlquiler',RentingController.DeleteRenting)

router.post('/delete/all',RentingController.DeleteMultipleRenting)

router.get('/:IdAlquiler', RentingController.FindOneRentingById)

module.exports = router