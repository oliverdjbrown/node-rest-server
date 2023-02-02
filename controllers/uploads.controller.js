const { response } = require("express");
const { uploadFileHelper } = require('../helpers');

const { fileNotExist } = require("../const/messages");

const uploads = async(req, res = response) => {  

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json(fileNotExist);
  }

  const allowedExtensions = ['txt', 'md'];
  try {
    //const file = await uploadFileHelper(req.files, allowedExtensions);
    const file = await uploadFileHelper(req.files, undefined, 'img');
    res.status(200).json(file);
  } catch(err) {
    res.status(400).json(err)
  }  
};

module.exports = {
  uploads,
};
