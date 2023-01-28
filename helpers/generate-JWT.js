const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, (error, token)=> {
            if(error) {
                console.log(error)
                reject('jwt cannot be generated.');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}