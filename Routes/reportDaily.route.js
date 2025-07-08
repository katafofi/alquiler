const router = require('express').Router();
const reportDailyController = require('../Controllers/reportDaily.controller');

// Ruta GET que ejecuta el controlador
router.get('/', reportDailyController.getReportDaily);

module.exports = router;
