const router = require('express').Router();
const accesoriesInventoryController = require('../Controllers/accesories_inventory.controllers');

//traer informacion
router.get('/',accesoriesInventoryController.FindAllAccesoriesInventory)

// por seguridad se recomienda post -> crear.
router.post('/', accesoriesInventoryController.CreateAccesoriesInventory)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdInventarioAccesorios', accesoriesInventoryController.UpdateAccesoriesInventory);

router.delete('/:IdInventarioAccesorios', accesoriesInventoryController.DeleteAccesoriesInventory)

router.post('/delete/all',accesoriesInventoryController.DeleteMultipleAccesoriesInventory)

router.get('/:IdInventarioAccesorios', accesoriesInventoryController.FindOneAccesoriesInventoryById)

module.exports = router