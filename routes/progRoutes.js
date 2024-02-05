const {Router } = require('express');
const controlador = require('../controllers/tareasController');
const controladorUsuario = require('../controllers/userController');

const mid = require('../middlewares/checkDatos')
const midJWT = require('../middlewares/validarJWT')
const router = Router();

router.use(midJWT.validarToken)

// Todas las tareas disponibles
router.get('/tareas/disponibles',controlador.tareasDisponibles)

// Consultar tareas de un usuario introducion id del usuario
router.get('/tareas/:id',mid.existeUsuario, controlador.obtenerTareasUsuario)

// Usuario indica porcentaje y estado de su propia tarea
router.put('/tareas/:idTarea/:idUsuario',mid.perteneceTarea,controlador.modificarTareaUsuario)

// Obtener ranking de jugadores
router.get('/ranking', controladorUsuario.getRanking)

// Modifica la contraseña de un usuario
router.put('/change_password/:id', mid.existeUsuario,controladorUsuario.modificarPassword)
module.exports = router