const jwt = require('jsonwebtoken');
const { User } = require('../src/models');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
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

const validateJWT = async(token = '') => {
    try {
        
        if(token.length < 10) return null

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(uid);

        if(!user.state) return null

        return user ? user : null;

    } catch (error) {
        return null
    }
}

module.exports = {
    generateJWT,
    validateJWT
}