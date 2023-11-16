const router = require('express').Router();
const SizesController = require('../Controllers/sizes.controller');



//traer informacion
router.get('/', SizesController.FindAllSizes)

// por seguridad se recomienda post -> crear.
router.post('/',SizesController.CreateSizes)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdTalla',SizesController.UpdateSizes )

router.delete('/:IdTalla',SizesController.DeleteSizes)

router.post('/delete/all', SizesController.DeleteMultipleSizes)

router.get('/:IdTalla', SizesController.FindOneSizesById)

module.exports = router




