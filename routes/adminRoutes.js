const {Router} = require('express');
const {check} = require('express-validator')
const controlador = require('../controllers/tareasController');
const controladorUsuario = require('../controllers/userController')
const midJWT = require("../middlewares/validarJWT");
const {validarCampos} = require("../middlewares/validar-campos");
const mid = require('../middlewares/checkDatos')

const router = Router();

router.use(midJWT.validarAdmin)


// ----------------------------------Rutas de Tareas
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

// Modificar tarea
router.put('/tareas/:idTarea',[
    check('descripcion', 'La descripcion debe contener entre 5 y 255 carácteres.').isString().isLength({
        min: 5,
        max: 255
    }),
    check('dificultad', 'La dificultad debe ser: XS, M, L, XL').isIn(['XS', 'S', 'M', 'L', 'XL']),
    check('horas_previstas', 'Las horas previstas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
    check('horas_realizadas', 'Las horas realizadas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
    check('porcentaje', 'El porcentaje de una tarea debe estar entre 0 - 100').isInt({min: 0, max: 100}),
    check('completada', 'El campo completada solo admite 1 o 0').isInt({min: 0, max: 1}),
    validarCampos
], mid.existeIdTarea, controlador.modificarTarea)

router.route('/tareas/:id')

    // Eliminar tarea
    .delete(controlador.borrarTarea)

    // Obtener una tarea
    .get(controlador.obtenerTarea)

// Obtener todas las tareas
router.get('/tareas', controlador.obtenerTareas)


// Administrador asigna tarea a un usuario
router.put('/tarea/usuario/:idUsuario/:idTarea', mid.existeIdUsuario, mid.existeIdTarea, controlador.asignarTarea)


// ----------------------------------Rutas de usuario
router.route('/usuarios')
    .get(controladorUsuario.obtenerUsuarios)

    .post([
        check('email').custom(mid.emailExiste).isEmail(),
        check('password').isString().isLength({min: 3, max: 90}),
        check('nombre').isString().isLength({min: 3, max: 40}),
        check('rol').custom(mid.rolExiste),
        validarCampos
    ], controladorUsuario.crearUsuario)

router.route('/usuarios/:id')
    .get(mid.existeUsuario, controladorUsuario.obtenerUsuario)

    .delete(mid.existeUsuario, controladorUsuario.borrarUsuario)

    .put([
        check('email').custom(mid.emailExiste).isEmail(),
        check('password').isString().isLength({min: 3, max: 90}),
        check('nombre').isString().isLength({min: 3, max: 40}),
        validarCampos
    ],mid.existeUsuario, controladorUsuario.modificarUsuario)


//router.put('/usuarios/rol/:id', [
//    check('rol').custom(mid.rolExiste),
//    validarCampos
//],mid.existeUsuario,controladorUsuario.asignarRol)
module.exports = router;