const {Router } = require('express');
const controlador = require('../controllers/userController');
const mid = require('../middlewares/checkDatos')
const router = Router();

router.post('/registro',mid.emailRegistrado ,controlador.registroUsuario)
router.post('/login', controlador.login)

module.exports = router;