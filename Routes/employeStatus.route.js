const router = require('express').Router();
const employeStatusController = require('../Controllers/employeStatus.controller');

// Obtener todos los estados de empleados
router.get('/', employeStatusController.findAllEmployeStatus);

// Crear un nuevo estado de empleado
router.post('/', employeStatusController.createEmployeStatus);

// Actualizar un estado de empleado por ID
router.patch('/:IdEstadoEmpleado', employeStatusController.updateEmployeStatus);

// Eliminar un estado de empleado por ID
router.delete('/:IdEstadoEmpleado', employeStatusController.deleteEmployeStatus);

// Eliminar múltiples estados de empleado
router.post('/delete/all', employeStatusController.deleteMultipleEmployeStatus);

// Obtener un estado de empleado por ID
router.get('/:IdEstadoEmpleado', employeStatusController.findOneEmployeStatusById);

module.exports = router;