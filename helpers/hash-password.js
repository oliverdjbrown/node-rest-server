const bcryptjs  = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

module.exports = hashPassword;

