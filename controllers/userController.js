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

const obtenerUsuarios = async(req = request, res = response) => {
    let resultado = await conx.getUsuarios()
    res.status(200).json({'success': true, 'usuarios': resultado})
}

const obtenerUsuario = async (req = request, res = response) => {
    let resultado = await conx.getUsuario(req.params.id)
    res.status(200).json({'success': true, 'usuario': resultado})
}

const borrarUsuario = async (req = request, res = response) => {
    let resultado = await conx.deleteUsuario(req.params.id)
    res.status(200).json({'success': true, 'mssg': 'Usuario eliminado', 'data': resultado})
}

const modificarUsuario = async (req = request, res = response) => {
    req.body.password = cifrarPassword(req.body.password)
    let resultado = await conx.updateUsuario(req.body, req.params.id)
    if (!resultado) {
        res.status(203).json({'success': false, 'mssg': 'Error al modificar el usuario'})
    }
    res.status(200).json({'success': true, 'usuario': resultado})

}

const crearUsuario = async (req = request, res = response) => {
    let body = req.body
    body.password = await cifrarPassword(body.password)

    let usuario = await conx.insertarUsuario(req.body)
    if (!usuario) {
        res.status(203).json({'success': false, 'mssg': 'Error al crear usuario'})
    }
    res.status(201).json({'usuario':usuario})
}

const tareasDisponibles = async (req = request, res = response) => {
    let tareasDisponibles = await conx.getTareasDisponibles()
    if (!tareasDisponibles) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener tareas'})
    }
    res.status(200).json({'succes': true, 'tareas': tareasDisponibles})
}

const getRanking = async(req = request, res = response) => {
    const ranking = await conx.ranking()
    if (!ranking) {
        return res.status(200).json({'success': false, 'mssg':'Error al obtener el ranking'})
    }
    res.status(200).json({'success': true, 'data': ranking})
}

const modificarPassword = async (req = request, res = response) => {
    let resultado = await conx.changePassword(req.body,req.params.id)
    if (!resultado) {
        return res.status(200).json({'success': false, 'mssg': 'Error al cambiar la contraseña'})
    }
    res.status(200).json({'success': true, 'mssg': 'Contraseña cambiada correctamente', 'data': resultado})
}

module.exports = {
    registroUsuario,
    login,
    obtenerUsuarios,
    obtenerUsuario,
    borrarUsuario,
    modificarUsuario,
    crearUsuario,
    tareasDisponibles,
    getRanking,
    modificarPassword
}
