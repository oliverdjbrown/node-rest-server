const Role = require("../models/role.model");
const User = require("../models/user.model");

const isRole = async (rol = "") => {
  const roleExist = await Role.findOne({ rol });
  if (!roleExist)
    throw new Error(`The specified role ${rol} is not registered in database.`);
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist)
    throw new Error(`The specified email ${email} is already registered.`);
};

const userExistById = async (_id) => {
  const userExist = await User.findById({ _id });
  if (!userExist)
    throw new Error(`The Id ${_id} no exist.`);
};

module.exports = {
  isRole,
  emailExist,
  userExistById
};
