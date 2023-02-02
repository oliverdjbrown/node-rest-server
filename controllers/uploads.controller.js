const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { fileExist, status500, fileUploaded, fileExtension } = require("../const/messages");

const uploadFile = (req, res = response) => {  

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json(fileExist);
  }

  if (!req.files.file) {
    return res.status(400).json(fileExist);
  }

  
  const { file } = req.files;
  const fileNameToArray = file.name.split('.');
  const extension = fileNameToArray[fileNameToArray.length -1];
  const validFileExtension = ['png', 'jpg', 'jpeg', 'gif'];

  if(!validFileExtension.includes(extension)) {
    return res.status(400).json({
        ...fileExtension,
        validFileExtension
    });
  }

  const tempName = `${uuidv4()}.${extension}`;
  const uploadPath = path.join(__dirname, "../uploads/", tempName);
  
  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).json(status500);

    res.status(200).json(fileUploaded);
  });
};

module.exports = {
  uploadFile,
};
