const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String },
    email: { type: String },
    password : { type: String },
    rol : { type: String}
}, { collection: 'usuarios' , versionKey: false });

const UserModel = mongoose.model('Usuario', userSchema);

module.exports = UserModel;