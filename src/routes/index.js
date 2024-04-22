const express = require("express");
const router = express.Router();
const fs = require("fs");
const { status404 } = require("../../constants");

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);  
  const skip = ["index"].includes(fileWithOutExt);
  
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}.routes`));
    console.log("Loading route =>", fileWithOutExt);
  }
});

router.get("*", (req, res) => {
  const { code, message } = status404;
  
  res.status(code).send(message);  
});

module.exports = router;
