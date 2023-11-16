const router = require('express').Router();
const EmployeStatusController = require('../Controllers/employeStatus.controller');

//traer informacion
router.get('/', EmployeStatusController.findAllEmployeStatus)

// por seguridad se recomienda post -> crear.
router.post('/', EmployeStatusController.createEmployeStatus)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdEstadoEmpleado:', EmployeStatusController.updateEmployeStatus)

router.delete('/:IdEstadoEmpleado:',EmployeStatusController.deleteEmployeStatus)

router.post('/delete/all',EmployeStatusController.deleteMultipleEmployeStatus)

router.get('/IdEstadoEmpleado:', EmployeStatusController.findOneEmployeStatusById)

module.exports = router