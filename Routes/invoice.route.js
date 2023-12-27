const router = require('express').Router();
const invoiceController = require('../Controllers/invoice.controller');

router.get('/', invoiceController.getDefaultResponse)
router.get('/:IdOrdenCompra', invoiceController.findInvoiceByPurchaseId)

module.exports = router