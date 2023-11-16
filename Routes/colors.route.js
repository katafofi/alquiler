const router = require('express').Router();
const ColorsController = require('../Controllers/colors.controller');

//traer informacion
router.get('/', ColorsController.FindAllColors)

// por seguridad se recomienda post -> crear.
router.post('/',ColorsController.CreateColors)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdColor',ColorsController.UpdateColors )

router.delete('/:IdColor',ColorsController.DeleteColors)

router.post('/delete/all', ColorsController.DeleteMultipleColors)

router.get('/:IdColor', ColorsController.FindOneColorsById)

module.exports = router