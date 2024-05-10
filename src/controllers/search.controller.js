const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { collectionExist, status503 } = require("../../constants");
const { User, Category, Product } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.status(200).json({ result: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.status(200).json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.status(200).json({ result: category ? [category] : [] });
  }

  const regex = new RegExp(term, "i");
  const categories = await Category.find({ category: regex, state: true });

  res.status(200).json({
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term).populate("category, name");
    return res.status(200).json({ result: product ? [product] : [] });
  }

  const regex = new RegExp(term, "i");
  const products = await Product.find({ product: regex, state: true }).populate(
    "category, name"
  );

  res.status(200).json({
    results: products,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json(collectionExist);
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      return res.status(status503.code).json(status503.message);
  }
};

module.exports = {
  search,
};
