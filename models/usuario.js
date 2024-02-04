const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String },
    email: { type: String },
    password : { type: String },
    tareas_completadas: { type: Number, default: 0},
    rol : { type: String}
}, { collection: 'usuarios' , versionKey: false });

const UsuarioModel = mongoose.model('Usuario', userSchema);

module.exports = UsuarioModel;