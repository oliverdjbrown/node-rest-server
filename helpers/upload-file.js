const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { fileExtension } = require("../constants/messages");
const validFileExtension = ["png", "jpg", "jpeg", "gif"];

const uploadFileHelper = (files, validExtensions = validFileExtension, folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const fileNameToArray = file.name.split(".");
    const extension = fileNameToArray[fileNameToArray.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} ${fileExtension.message}, ${validExtensions}`
      );
    }

    const tempName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) return reject(err);

      resolve(tempName);      
    });
  });
};

module.exports = {
    uploadFileHelper,
};
