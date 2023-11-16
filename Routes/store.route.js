const router = require('express').Router();
const StoreController = require('../Controllers/store.controller');

//traer informacion
router.get('/',StoreController.FindAllStore)

// por seguridad se recomienda post -> crear.
router.post('/', StoreController.CreateStore)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdTienda', StoreController.UpdateStore)

router.delete('/:IdTienda', StoreController.DeleteStore)

router.post('/delete/all', StoreController.DeleteMultipleStore)

router.get('/:IdTienda', StoreController.FindOneStoreById)

module.exports = router