const { request, response } = require("express");
const hashPassword = require("../helpers/hash-password");
const User = require("../models/user.model");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([    
    User.countDocuments(query),
    User.find(query)
    .skip(Number(skip))
    .limit(Number(limit))
  ]);

  res.status(200).json({
    total,
    users
  });
};

const userPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  //Encrypt password
  user.password = hashPassword(password);

  //Save To DB
  await user.save();

  res.status(201).json({
    user,
  });
};

const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...data } = req.body;

  if (password) data.password = hashPassword(password);

  const user = await User.findByIdAndUpdate(id, data);

  res.status(200).json({
    user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    message: "patch API",
  });
};

const userDelete = async(req, res = response) => {
  const id = req.params.id;

  //permanent delete
  //const user = await User.findByIdAndDelete(id);
  
  //soft delete
  const user = await User.findByIdAndUpdate(id, {state: false});

  res.json({    
    user
  });
};

module.exports = {
  usersGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
