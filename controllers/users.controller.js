const { request, response } = require("express");

const usersGet = (req = request, res = response) => {
  const queryParams = req.query
  
  res.status(200).json({
    message: "get API from controller",
    ...queryParams
  });
};

const userPost = (req, res = response) => {
  const body = req.body;
  
  res.status(201).json({
    message: 'post Api',
    ...body
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;
  
  res.status(500).json({
    message: "put API",
    id
  });
};

const userPatch = (req, res = response) => {
  res.json({
    message: "patch API",
  });
};

const userDelete = (req, res = response) => {
  const id = req.params.id;

  res.json({
    message: "delete API",
    id
  });
};

module.exports = {
  usersGet,
  userPost,
  userPut,
  userPatch,
  userDelete
};
