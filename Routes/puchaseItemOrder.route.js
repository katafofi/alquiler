const router = require('express').Router();
const PuchareItemOrderController = require('../Controllers/puchaseItemOrder.controller');

//traer informacion
router.get('/',PuchareItemOrderController.FindAllPuchareItemOrder)

// por seguridad se recomienda post -> crear.
router.post('/', PuchareItemOrderController.CreatePuchareItemOrder)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdArticuloOrdenCompra', PuchareItemOrderController.UpdatePuchareItemOrder )

router.delete('/:IdArticuloOrdenCompra', PuchareItemOrderController.DeletePuchareItemOrder)

router.post('/delete/all', PuchareItemOrderController.DeleteMultiPuchareItemOrder)

router.get('/:IdOrdenCompra', PuchareItemOrderController.FindOnePuchareItemOrderById)

module.exports = router