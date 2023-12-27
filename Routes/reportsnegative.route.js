const { ReportsNegativeEmail, Consult } = require('../Controllers/reportsnegative.controller');
const router = require('express').Router();

router.post('/', ReportsNegativeEmail)
router.get('/:Cedula', Consult)

module.exports = router