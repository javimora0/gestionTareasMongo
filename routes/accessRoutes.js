const {Router } = require('express');
const controlador = require('../controllers/userController');
const router = Router();

router.post('/registro', controlador.registroUsuario)
router.post('/login', controlador.login)

module.exports = router;