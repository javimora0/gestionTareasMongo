const { response, request  } = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionTarea = require('../database/ConexionTarea')

const existeUsuario = async (req, res, next) => {
    const conx = new Conexion()
    if (!req.params.id){
        next()
    }else {
        let usuario = await conx.getUsuario(req.params.id)
        if (!usuario) {
            return res.status(203).json({'success':false, 'mssg':'Usuario no encontrado'})
        }else {
            next()
        }
    }
}

const existeIdUsuario = async (req, res, next) => {
    let usuario = await conx.getUsuario(req.params.idUsuario)
    if (!usuario) {
        return res.status(203).json({'success':false, 'mssg':'Usuario no encontrado'})
    }else {
        next()
    }
}

const existeIdTarea = async (req, res, next) => {
    const conx = new ConexionTarea()
    let tarea = await conx.getTarea(req.params.idTarea)
    if (!tarea) {
        return res.status(203).json({'success':false, 'mssg':'Tarea no encontrado'})
    }else {
        next()
    }
}
module.exports = {
    existeUsuario,
    existeIdTarea,
    existeIdUsuario
}