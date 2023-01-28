const { response } = require("express")

const isUserAuth = (req) => {
    if(!req.user) return res.status(500).json({message: 'user wants to verify role without validate token first'});
}

const isAdmin = async(req, res = response, next) => {

    isUserAuth(req);

    const { rol, name } = req.user;
    
    if(rol !== 'ADMIN_ROLE') return res.status(401).json({message: `${name} is not an admin.`})
    
    next();
}

const hasRole = (...roles) => {       
    return (req, res = response, next) => {
        isUserAuth(req);

        if(!roles.includes(req.user.rol)) return res.status(401).json({message: 'role not valid'});
        next();
    }
}

module.exports = {
    isAdmin,
    hasRole
}