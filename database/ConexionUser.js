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

    sumarTareaCompletada = async (idUsuario) => {
        let usuario
        try {
            usuario = await Usuario.findById(idUsuario)
            console.log(idUsuario)
            usuario.tareas_completadas = usuario.tareas_completadas + 1
            usuario = await usuario.save()
        } catch (error) {
            throw error
        }
        return usuario
    }

    getUsuarios = async () => {
        let resultado = await Usuario.find()
        if (!resultado) {
            resultado = null
        }
        return resultado;
    }

    deleteUsuario = async (id) => {
        let resultado = await Usuario.findByIdAndDelete(id)

        if (!resultado) {
            resultado = null
        }
        return resultado
    }

    updateUsuario = async (body, id) => {
        let resultado
        try {
            resultado = await Usuario.findByIdAndUpdate({_id:id},{
                nombre:body.nombre,
                email:body.email,
                password: body.password,
                tareas_completadas: body.tareas_completadas
            },{new: true})
        } catch (error) {
            throw error
        }
        return resultado
    }

    emailExisteValidator = async (email) => {
        let usuario = []
        try {
            usuario = await Usuario.find({email:email})
            console.log(usuario)
        }catch (error) {
            console.error(error)
        } finally {
            if (usuario.length !== 0) {
                throw new CustomError('Email existe')
            }
        }
        return usuario
    }

    insertarUsuario = async (body) => {
        let resultado
        try {
            resultado = await Usuario.create(body)
        } catch (error) {
            throw error
        }
        return resultado
    }
    ranking = async () => {
        let usuarios
        try {
            usuarios = await Usuario.find({}).sort({ tareas_completadas: -1 })
        } catch (error) {
            throw error;
        }
        return usuarios
    }

    changePassword = async (body, idUsuario) => {
        try {
            let usuario = await Usuario.findById(idUsuario);
            if (!usuario) {
                return null;
            }

            let resultado = await bcrypt.compare(body.old_password, usuario.password);
            if (!resultado) {
                return null;
            }

            let newPassword = await bcrypt.hash(body.new_password, 10);
            usuario = await Usuario.findByIdAndUpdate(idUsuario, { password: newPassword }, { new: true });

            return usuario;
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
        }
    }

}


module.exports = ConexionUser