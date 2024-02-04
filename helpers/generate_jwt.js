const jwt = require('jsonwebtoken')


const generarJWT = (uid = '', rol = '') => {
    let token = jwt.sign({uid, rol},process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' // 24 hours
    });
    return token;
}

module.exports = {
    generarJWT
}