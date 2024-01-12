const router = require('express').Router();
const StatusRentingController = require('../Controllers/statusRenting.controller');

//traer informacion
router.get('/', StatusRentingController.FindAllStatusRenting)

// por seguridad se recomienda post -> crear.
router.post('/', StatusRentingController.CreateStatusRenting)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdEstadoAlquiler',StatusRentingController.UpdateStatusRenting)

router.delete('/:IdEstadoAlquiler', StatusRentingController.DeleteStatusRenting)

router.post('/delete/all', StatusRentingController.DeleteMultipleStatusRenting)

router.get('/:IdEstadoAlquiler', StatusRentingController.FindOneStatusRentingById)

module.exports = router