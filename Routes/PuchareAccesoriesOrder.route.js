const router = require('express').Router();
const PuchaseAccesoriesOrderController = require('../Controllers/purchase_accesories_order.model');

//traer informacion
router.get('/',PuchaseAccesoriesOrderController. FindAllPuchaseAccesoriesOrder)

// por seguridad se recomienda post -> crear.
router.post('/', PuchaseAccesoriesOrderController.CreatePuchaseAccesoriesOrder)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdAccesorioOrdenCompra', PuchaseAccesoriesOrderController.UpdatePuchaseAccesoriesOrder)

router.delete('/:IdAccesorioOrdenCompra', PuchaseAccesoriesOrderController.DeletePuchaseAccesoriesOrder)

router.post('/delete/all',PuchaseAccesoriesOrderController.DeleteMultiplePuchaseAccesoriesOrder)

router.get('/:IdAccesorioOrdenCompra', PuchaseAccesoriesOrderController.FindOnePuchaseAccesoriesOrderById)

module.exports = router