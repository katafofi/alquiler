const router = require('express').Router();
const AccesoriesInventoryController = require('../Controllers/accesoriesInventory.controllers');

//traer informacion
router.get('/',AccesoriesInventoryController.FindAllAccesoriesInventory)

// por seguridad se recomienda post -> crear.
router.post('/', AccesoriesInventoryController.CreateAccesoriesInventory)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdInventarioAccesorios', AccesoriesInventoryController.UpdateAccesoriesInventory);

router.delete('/:IdInventarioAccesorios', AccesoriesInventoryController.DeleteAccesoriesInventory)

router.post('/delete/all',AccesoriesInventoryController.DeleteMultipleAccesoriesInventory)

router.get('/:IdInventarioAccesorios', AccesoriesInventoryController.findOneAccesoriesInventoryById)

module.exports = router