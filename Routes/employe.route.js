const router = require('express').Router();
const employeController = require('../Controllers/employe.controller');

//traer informacion
router.get('/', employeController.FindAllEmploye)

// por seguridad se recomienda post -> crear.
router.post('/', employeController.CreateEmploye)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:correo', employeController.UpdateEmploye )

router.delete('/:correo', employeController.DeleteEmploye)

router.post('/delete/all', employeController.DeleteMultiple)

router.get('/:correo', employeController.FindOneEmployeById)

module.exports = router