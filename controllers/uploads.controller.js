const { response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFileHelper } = require("../helpers");
const { User, Product } = require("../models");

const { fileNotExist, status500, status400 } = require("../const/messages");

const uploads = async (req, res = response) => {
  const allowedExtensions = ["txt", "md"];
  try {
    //const file = await uploadFileHelper(req.files, allowedExtensions);
    const file = await uploadFileHelper(req.files, undefined, "img");
    res.status(200).json(file);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUpload = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    case "products":
      model = await Product.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    default:
      return res.status(500).json(status500);
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, model.img);

    try {
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const file = await uploadFileHelper(req.files, undefined, collection);
    model.img = file;
    await model.save();

    res.status(200).json({
      model,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updatePictureCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    case "products":
      model = await Product.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    default:
      return res.status(500).json(status500);
  }

  if (model.img) {
    const nameArr = modelo.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;

  await model.save();

  res.status(200).json({ secure_url });
};

const showImages = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    case "products":
      model = await Product.findById(id);
      if (!model) return res.status(400).json(status400);

      break;
    default:
      return res.status(500).json(status500);
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, model.img);

    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const pathImg = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathImg);
};

module.exports = {
  uploads,
  updateUpload,
  showImages,
  updatePictureCloudinary,
};
