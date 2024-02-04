const { response, request  } = require('express')
const Conexion = require('../database/ConexionUser')
const existeUsuario = async (req, res, next) => {
    const conx = new Conexion()
    let usuario = await conx.getUsuario(req.params.id)
    if (!usuario) {
        return res.status(203).json({'success':false, 'mssg':'Usuario no encontrado'})
    }else {
        next()
    }
}
module.exports = {
    existeUsuario
}