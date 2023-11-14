const router = require('express').Router();
const accesoriesController = require('../Controllers/accesories.controller');

//traer informacion
router.get('/',accesoriesController.FindAllAccesories)

// por seguridad se recomienda post -> crear.
router.post('/', accesoriesController.CreateAccesories)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdAccesorio', accesoriesController.UpdateAccesories )

router.delete('/:IdAccesorio', accesoriesController.DeleteAccesories)

router.post('/delete/all',accesoriesController.DeleteMultipleAccesories)

router.get('/:IdAccesorio', accesoriesController.FindOneAccesoriesById)

module.exports = router