const bcryptjs = require("bcryptjs");

const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const comparePassword = (password, encryptedPassword) => {  
  return bcryptjs.compareSync(password, encryptedPassword);
};

module.exports = { hashPassword, comparePassword };