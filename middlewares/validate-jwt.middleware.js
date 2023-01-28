const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async(req, res = response, next) => {
    const message = {message: 'Unauthorized'};
    const token = req.header('jwt');      

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid); 
        
        if(!user) return res.status(401).json(message);
        
        if(!user.state) return res.status(401).json(message);

        req.user = user;
        next();
    } catch (error) {        
        res.status(401).json(message)
    }
    
}

module.exports = {
    validateJWT
}