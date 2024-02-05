const Tarea = require('../models/tarea')

class ConexionTarea {
    insetarTarea = async (body, id) => {
        let idUsuario
        if (!id) {
            idUsuario = null
        } else {
            idUsuario = id
        }
        let resultado
        try {
            resultado = await Tarea.create({
                descripcion: body.descripcion,
                dificultad: body.dificultad,
                horas_previstas: body.horas_previstas,
                horas_realizadas: body.horas_realizadas,
                porcentaje: body.porcentaje,
                completada: body.completada,
                asignado_a: idUsuario
            })
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

    asignarTarea = async (idTarea, idUsuario) => {
        let tarea
        try {
            tarea = await Tarea.updateOne({_id: idTarea}, {asignado_a: idUsuario})
        } catch (error) {
            throw error
        }
        return tarea
    }

    updateTarea = async (body, idTarea) => {
        let tarea
        try {
            tarea = await Tarea.findOneAndUpdate({_id: idTarea}, {

                descripcion: body.descripcion,
                dificultad: body.dificultad,
                horas_previstas: body.horas_previstas,
                horas_realizadas: body.horas_realizadas,
                porcentaje: body.porcentaje,
                completada: body.completada

            }, {new: true});
        } catch (error) {
            throw error
        }
        return tarea
    }

    getTareasDisponibles = async () => {
        let tareas = await Tarea.find({asignado_a:null,completada:0})
        if (!tareas) {
            tareas = null
        }
        return tareas
    }

    getTareasUsuario = async (idUsuario) => {
        let tareas
        tareas = await Tarea.find({asignado_a:idUsuario})
        return tareas
    }

    getTareaUsuario = async (idUsuario, idTarea) => {
        let tareas
        tareas = await Tarea.findOne({ asignado_a: idUsuario, _id: idTarea });
        console.log(tareas)
        return tareas
    }



}

module.exports = ConexionTarea