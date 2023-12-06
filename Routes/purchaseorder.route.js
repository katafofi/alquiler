const router = require('express').Router();
const PuchaseOrderController = require('../Controllers/purchaseorder.Controller');

router.post('/invoice', PuchaseOrderController.generateInvoice)
//traer informacion
router.get('/', PuchaseOrderController.findAllPurchaseOrder)

// por seguridad se recomienda post -> crear.
router.post('/', PuchaseOrderController.createPurchaseOrder)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdOrdenCompra', PuchaseOrderController.updatePurchaseOrder )

router.delete('/:IdOrdenCompra',PuchaseOrderController.deletePurchaseOrder)

router.post('/delete/all',PuchaseOrderController.deleteMultiplePurchaseOrder)

router.get('/:IdOrdenCompra', PuchaseOrderController.findOnePurchaseOrderById)

module.exports = router