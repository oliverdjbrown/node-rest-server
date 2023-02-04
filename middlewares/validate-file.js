const { response } = require("express");
const { fileNotExist } = require("../const/messages");

const validateFileToBeUpload = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json(fileNotExist);
  }

  next();
};

module.exports = {
  validateFileToBeUpload,
};
