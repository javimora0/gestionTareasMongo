const jwt = require('jsonwebtoken')
const {response, request} = require('express')

const validarAdmin = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {rol} = jwt.verify(token, process.env.secretOrPrivateKey)
        if (rol === "admin") {
            next()
        }else {
            res.status(400).json({'msg':'Acceso no autorizado'})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarProgramador = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {uid, rol} = jwt.verify(token, process.env.secretOrPrivateKey)
        if (rol === "programador") {
            next()
        }else {
            res.status(400).json({'msg':'Acceso no autorizado'})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({'msg':'Token no valido'})
    }
}
const validarToken = (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }
    try {
        const {uid, rol} = jwt.verify(token, process.env.secretOrPrivateKey)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({'msg':'Token no valido'})
    }
}

module.exports = {
    validarAdmin,
    validarProgramador,
    validarToken,
}