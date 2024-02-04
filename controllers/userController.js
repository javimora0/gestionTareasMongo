const {response, request} = require('express')
const Conexion = require('../database/ConexionUser');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generate_jwt')

const conx = new Conexion()
const registroUsuario = async (req = request, res = response) => {
    req.body.password = await cifrarPassword(req.body.password)
    let usuario = await conx.registroUsuario(req.body)
    res.status(201).json(usuario)
}

const login = async (req = request, res = response) => {
    const usuario = await conx.getUsuarioRegistrado(req.body.email, req.body.password)
    if (usuario === 0) {
       return res.status(203).json({'msg': 'Usuario No existe'})
    }
    if (usuario === -1 ){
        return res.status(203).json({'msg': 'Contraseña incorrecta'})
    }
    const token = generarJWT(usuario._id, usuario.rol)
    res.status(200).json({'usuario': usuario, 'token':token})
}

const cifrarPassword = async (password) => {
    return bcrypt.hash(password, 10);
}
module.exports = {
    registroUsuario,
    login
}
