const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const tareaSchema = new mongoose.Schema({
    descripcion: { type: String },
    dificultad: { type: String},
    horas_previstas: { type : Number},
    horas_realizadas: { type: Number},
    porcentaje: { type: Number},
    completada: { type: Number},
    asignado_a: { type: Schema.Types.ObjectId, ref: 'Usuario'}

}, { collection: 'tareas' , versionKey: false });

const TareaModel = mongoose.model('Tarea', tareaSchema);

module.exports = TareaModel;