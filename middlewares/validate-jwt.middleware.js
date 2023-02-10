const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {status401} = require('../const/messages/http-responses');

const validateJWT = async(req, res = response, next) => {
    
    const token = req.header('jwt');      

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid); 
        
        if(!user) return res.status(401).json(status401);
        
        if(!user.state) return res.status(401).json(status401);

        req.user = user;
        next();
    } catch (error) {        
        res.status(401).json(status401)
    }
    
}

module.exports = {
    validateJWT
}