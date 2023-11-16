const router = require('express').Router();
const PuchareAccesoriesOrderController = require('../Controllers/purchase_accesories_order.model');

//traer informacion
router.get('/',PuchareAccesoriesOrderController. FindAllPuchareAccesoriesOrder)

// por seguridad se recomienda post -> crear.
router.post('/', PuchareAccesoriesOrderController.CreatePuchareAccesoriesOrder)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdAccesorioOrdenCompra:', PuchareAccesoriesOrderController.UpdatePuchareAccesoriesOrder )

router.delete('/:IdAccesorioOrdenCompra:', PuchareAccesoriesOrderController.DeleteMultiplePuchareAccesoriesOrder)

router.post('/delete/all',PuchareAccesoriesOrderController.DeleteMultiplePuchareAccesoriesOrder)

router.get('/:IdAccesorioOrdenCompra:', PuchareAccesoriesOrderController.FindOnePuchareAccesoriesOrderById)

module.exports = router