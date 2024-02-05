const {Router} = require('express');
const {check} = require('express-validator')
const controlador = require('../controllers/tareasController');
const midJWT = require("../middlewares/validarJWT");
const {validarCampos} = require("../middlewares/validar-campos");
const mid = require('../middlewares/checkDatos')

const router = Router();

router.use(midJWT.validarAdmin)

// Crear tarea
router.post('/tareas/:id?', [
    check('descripcion', 'La descripcion debe contener entre 5 y 255 carácteres.').isString().isLength({
        min: 5,
        max: 255
    }),
    check('dificultad', 'La dificultad debe ser: XS, M, L, XL').isIn(['XS', 'S', 'M', 'L', 'XL']),
    check('horas_previstas', 'Las horas previstas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
    check('porcentaje', 'El porcentaje de una tarea debe estar entre 0 - 100').isInt({min: 0, max: 100}),
    check('completada', 'El campo completada solo admite 1 o 0').isInt({min: 0, max: 1})
    , validarCampos
], mid.existeUsuario, controlador.crearTarea)

router.route('/tareas/:id')

    // Eliminar tarea
    .delete(controlador.borrarTarea)

    // Obtener una tarea
    .get(controlador.obtenerTarea)

// Obtener todas las tareas
router.get('/tareas', controlador.obtenerTareas)



// Administrador asigna tarea a un usuario
router.put('/tarea/usuario/:idUsuario/:idTarea', mid.existeIdUsuario, mid.existeIdTarea,controlador.asignarTarea)


module.exports = router;