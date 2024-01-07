const router = require('express').Router();
const sendEmailController = require('../Controllers/sendEmail.controller');

router.get('/', sendEmailController.getDefaultResponse)
router.post('/', sendEmailController.sendEmail)

module.exports = router