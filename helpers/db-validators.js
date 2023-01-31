const {User, Role, Category, Product} = require("../models");

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
  const id = await User.findById({ _id });
  if (!id)
    throw new Error(`The Id ${_id} not exist.`);
};

const categoryExistById = async (_id) => {
  const id = await Category.findById({ _id });
  if (!id)
    throw new Error(`The Id ${_id} not exist.`);
};

const productExistById = async (_id) => {
  const id = await Product.findById({ _id });
  if (!id)
    throw new Error(`The Id ${_id} not exist.`);
};

module.exports = {
  isRole,
  emailExist,  
  userExistById,
  categoryExistById,
  productExistById
};
