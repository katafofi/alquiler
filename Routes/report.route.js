const router = require('express').Router();
const reportController = require('../Controllers/report.controller');

router.get('/', reportController.generarReporte)
router.get('/week', reportController.generarReporteSemanal)

module.exports = router