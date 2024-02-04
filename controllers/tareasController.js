const {response, request} = require('express')
const Conexion = require('../database/ConexionTarea');
const conx = new Conexion()

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

module.exports = {
    crearTarea,
    borrarTarea,
    obtenerTarea,
    obtenerTareas
}