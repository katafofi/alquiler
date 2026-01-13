console.log("🔥 entregas.route.js CARGADO");

const router = require('express').Router();
const entregasController = require('../Controllers/entregas.controller');

router.get('/', entregasController.getEntregas);

module.exports = router;
router.get('/test', (req, res) => {
  res.json({ ok: true });
});