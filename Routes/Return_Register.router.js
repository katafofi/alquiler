const router = require('express').Router();
const ReturnRegisterController = require('../Controllers/ReturnRegistre.controller');

//traer informacion
router.get('/', ReturnRegisterController.FindAllReturnRegister)

// por seguridad se recomienda post -> crear.
router.post('/', ReturnRegisterController.CreateReturnRegisterg)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdRegistroDevolucion:', ReturnRegisterController.UpdateReturnRegister)

router.delete('/:IdRegistroDevolucion:',ReturnRegisterController.DeleteReturnRegister)

router.post('/delete/all',ReturnRegisterController.DeleteMultipleReturnRegister)

router.get('/IdRegistroDevolucion:', ReturnRegisterController.FindOneReturnRegisterById)

module.exports = router