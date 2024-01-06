const router = require('express').Router();
const reportController = require('../Controllers/report.controller');

router.get('/', reportController.generarReporte)

module.exports = router