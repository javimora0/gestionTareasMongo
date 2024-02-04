const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
class ConexionUser {
    registroUsuario = async (body) => {
        let retorno
        const {nombre, email,  password} = body

        let rol = 'programador';
        try {
           retorno = await Usuario.create({nombre, email, password, rol})
        } catch (error) {
            console.error(error)
            retorno = null
        }
        return retorno
    }

    getUsuarioRegistrado = async (email, password) => {
        let resultado
        try {
            resultado = await Usuario.findOne({email:email})
            if (!resultado) {
                return 0
            }
            let passwordCorrecta = await bcrypt.compare(password, resultado.password)
            if (!passwordCorrecta) {
                return -1
            }
        } catch (error) {
            console.error(error)
        }
        return resultado
    }

    getUsuario = async (id) => {
        let resultado
        try {
            resultado = await Usuario.findById(id)
        } catch (error) {
            console.error(error)
        }
        return resultado
    }
}


module.exports = ConexionUser