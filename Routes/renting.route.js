const router = require('express').Router();
const RentingController = require('../Controllers/renting.controller');

// Obtener todos los alquileres
router.get('/', RentingController.FindAllRenting);

// Crear un nuevo alquiler
router.post('/', RentingController.CreateRenting);

// Actualizar un alquiler (usando patch para actualizar parcialmente)
router.patch('/:IdAlquiler', RentingController.UpdateRenting);

// Eliminar un alquiler
router.delete('/:IdAlquiler', RentingController.DeleteRenting);

// Eliminar múltiples alquileres
router.post('/delete/all', RentingController.DeleteMultipleRenting);

// Obtener información sobre un alquiler específico por ID
router.get('/:IdAlquiler', RentingController.FindOneRentingById);

module.exports = router;
