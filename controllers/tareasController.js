const {response, request} = require('express')
const Conexion = require('../database/ConexionTarea');
const ConexionUsuario = require('../database/ConexionUser');
const Tarea = require('../models/tarea')
const conx = new Conexion()
const conxUser = new ConexionUsuario()
const crearTarea = async (req = request, res = response) => {
    let tarea = await conx.insetarTarea(req.body, req.params.id)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al crear tarea'})
    }
    res.status(200).json({'success': true, 'tarea': tarea})
}

const borrarTarea = async (req = request, res = response) => {
    let resultado = await conx.deleteTarea(req.params.id)
    if (!resultado) {
        return res.status(203).json({'success': false, 'mssg': 'La terea no existe'})
    }
    res.status(200).json({'success': true, 'mssg': 'Tarea eliminada'})
}

const obtenerTarea = async (req = request, res = response) => {
    let resultado = await conx.getTarea(req.params.id)
    if (!resultado) {
        return res.status(200).json({'success': false, 'mssg': 'No existe esta tarea'})
    }
    res.status(200).json({'success': true, 'tarea': resultado})
}

const obtenerTareas = async (req = request, res = response) => {
    let resultado = await conx.getTareas()
    res.status(200).json({'success': true, 'tareas': resultado})
}

const asignarTarea = async (req = request, res = response) => {
    let resultado = await conx.asignarTarea(req.params.idTarea, req.params.idUsuario)
    if (!resultado) {
        return res.status(203).json({'success': false, 'mssg': 'Error al asignar la tarea'})
    }
    res.status(200).json({'success': true, 'tarea': resultado})
}

const obtenerTareasUsuario = async (req = request, res = response) => {
    let resultado = await conx.getTareasUsuario(req.params.id)
    console.log(resultado.length)
    res.status(200).json({'success': true, 'tareas': resultado})
}

const modificarTarea = async (req = request, res = response) => {

    let tarea = await conx.updateTarea(req.body, req.params.idTarea)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al modificar la tarea'})
    }
    let usuario = await conxUser.getUsuario(tarea.asignado_a)
    if (req.body.completada === 1) {
        usuario = await conxUser.sumarTareaCompletada(tarea.asignado_a)
    }
    if (!usuario) {
        return res.status(203).json({'success': false, 'mssg': 'Error al añadir tarea al usuario'})
    }
    res.status(200).json({'success': true, 'data': tarea})
}

const tareasDisponibles = async (req = request, res = response) => {
    let tareasDisponibles = await conx.getTareasDisponibles()
    if (!tareasDisponibles) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener tareas'})
    }
    res.status(200).json({'succes': true, 'tareas': tareasDisponibles})
}

const modificarTareaUsuario = async (req = request, res = response) => {
    let tarea = await conx.updateTarea(req.body, req.params.idTarea)

    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al modificar la tarea'})
    }
    if (req.body.completada === 1) {
        await conxUser.sumarTareaCompletada(req.params.idUsuario)
    }
    res.status(200).json({'success': true, 'data': tarea})
}

module.exports = {
    crearTarea,
    borrarTarea,
    obtenerTarea,
    obtenerTareas,
    asignarTarea,
    modificarTarea,
    tareasDisponibles,
    obtenerTareasUsuario,
    modificarTareaUsuario
}