const router = require('express').Router();
const CategorysController = require('../Controllers/categorys.controller');

//traer informacion
router.get('/', CategorysController.FindAllCategorys)

// por seguridad se recomienda post -> crear.
router.post('/', CategorysController.CreateCategorys)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdCategoria', CategorysController.UpdateCategorys )

router.delete('/:IdCategoria', CategorysController.DeleteCategorys)

router.post('/delete/all', CategorysController.DeleteMultipleCategorys)

router.get('/:IdCategoria', CategorysController.FindOneCategorysById)

module.exports = router