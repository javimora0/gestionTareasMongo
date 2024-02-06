const {response, request} = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionTarea = require('../database/ConexionTarea')

const existeUsuario = async (req, res, next) => {
    const conx = new Conexion()
    if (!req.params.id) {
        next()
    } else {
        let usuario = await conx.getUsuario(req.params.id)
        if (!usuario) {
            return res.status(203).json({'success': false, 'mssg': 'Usuario no encontrado'})
        } else {
            next()
        }
    }
}

const existeIdUsuario = async (req, res, next) => {
    let usuario = await conx.getUsuario(req.params.idUsuario)
    if (!usuario) {
        return res.status(203).json({'success': false, 'mssg': 'Usuario no encontrado'})
    } else {
        next()
    }
}

const existeIdTarea = async (req, res, next) => {
    const conx = new ConexionTarea()
    let tarea = await conx.getTarea(req.params.idTarea)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Tarea no encontrado'})
    } else {
        next()
    }
}

const emailExiste = async (email = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion()
      conx.emailExisteValidator(email)
          .then(msg => {
              resolve(true);
          })
          .catch(err => {
              reject(new Error('Email existe'))
          });
    })
}

const rolExiste = (rol = '') => {
    return new Promise((resolve, reject) => {
        if (rol === 'admin' || rol === 'programador') {
            resolve(true);
        } else {
            reject(new CustomError('Rol no existe'));
        }
    });
}

const perteneceTarea = async (req, res, next) => {
    const conx = new ConexionTarea()
    let idUsuario = req.params.idUsuario
    let idTarea = req.params.idTarea

    let tarea = await conx.getTareaUsuario(idUsuario, idTarea)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Esta tarea no pertenece a este usuario'})
    } else {
        next()
    }
}

const getRanking = async (req = request, res = response) => {
    const ranking = await conx.ranking()
    if (!ranking) {
        return res.status(200).json({'success': false, 'mssg': 'Error al obtener el ranking'})
    }
    res.status(200).json({'success': true, 'data': ranking})
}

module.exports = {
    existeUsuario,
    existeIdTarea,
    existeIdUsuario,
    emailExiste,
    rolExiste,
    perteneceTarea,
    getRanking
}