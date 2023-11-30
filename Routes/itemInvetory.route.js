const router = require('express').Router();
const ItemInvetoryController = require('../Controllers/itemInvetory.controller');

//traer informacion
router.get('/',ItemInvetoryController.FindAllItemInvetory)

// por seguridad se recomienda post -> crear.
router.post('/', ItemInvetoryController.CreateItemInvetory)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdInventarioArticulo', ItemInvetoryController.UpdateItemInvetory )

router.delete('/:IdInventarioArticulo', ItemInvetoryController.DeleteItemInvetory)

router.post('/delete/all', ItemInvetoryController.DeleteMultipleItemInvetory)

router.get('/:IdInventarioArticulo', ItemInvetoryController.FindOneItemInvetoryById)

module.exports = router