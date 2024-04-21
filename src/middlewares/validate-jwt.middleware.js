const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { httpResponses } = require("../../constants/messages/http-responses");

const { status401 } = httpResponses;

const validateJWT = async (req, res = response, next) => {
  const token = req.header("authorization").slice(7);

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);

    if (!user) return res.status(status401.code).json(status401.message);

    if (!user.state) return res.status(status401.code).json(status401.message);

    req.user = user;
    next();
  } catch (error) {
    res.status(status401.code).json(status401.message);
  }
};

module.exports = {
  validateJWT,
};
