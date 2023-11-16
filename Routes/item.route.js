const router = require('express').Router();
const ItemController = require('../Controllers/item.controller');

//traer informacion
router.get('/',ItemController.findAllItem)

// por seguridad se recomienda post -> crear.
router.post('/', ItemController.createItem)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdArticulo', ItemController.updateItem )

router.delete('/:IdArticulo', ItemController.deleteItem)

router.post('/delete/all', ItemController.deleteMultipleItem)

router.get('/:IdArticulo', ItemController.findOneItemById)

module.exports = router