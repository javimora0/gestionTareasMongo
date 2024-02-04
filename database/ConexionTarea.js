const Tarea = require('../models/tarea')
class ConexionTarea {
    insetarTarea = async (body, id) => {
        let idUsuario
        if (!id) {
            idUsuario = null
        }else {
            idUsuario = id
        }
        let resultado
        try {
            resultado = await Tarea.create({descripcion: body.descripcion, dificultad: body.dificultad, horas_previstas:body.horas_previstas,
            horas_realizadas: body.horas_realizadas, porcentaje: body.porcentaje, completada: body.completada, asignado_a:idUsuario})
        } catch (error) {
            console.error(error)
        }
        return resultado
    }
    deleteTarea = async (id) => {
        let resultado
        try {
            resultado = await Tarea.findByIdAndDelete(id)
        } catch (error) {
            console.error(error)
        }
        return resultado
    }

    getTarea = async (id) => {
        let resultado = await Tarea.findById(id)
        if (!resultado) {
            resultado = null
        }
        return resultado
    }

    getTareas = async () => {
        let resultado = await Tarea.find()
        if (!resultado) {
            resultado = null
        }
        return resultado
    }
}

module.exports = ConexionTarea