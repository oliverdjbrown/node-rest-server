const { response } = require("express");
const { Category } = require("../models");
const { categoryExist } = require("../const/messages");

const categoryGet = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    categories,
  });
};

const categoryByIdGet = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.status(200).json({
    category,
  });
};

const categoryPost = async (req, res = response) => {
  const category = req.body.category.toUpperCase();
  const categoryDB = await Category.findOne({ category });

  if (categoryDB) return res.status(400).json(categoryExist);

  const data = {
    category,
    user: req.user._id,
  };

  const newCategory = new Category(data);
  await newCategory.save();
  res.status(201).json(newCategory);
};

const categoryPut = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  data.category = data.category.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(category);
};

const categoryDelete = async (req, res = response) => {
  const {id} = req.params;  

  const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});  

  res.json({    
    category
  });
};

module.exports = {
  categoryGet,
  categoryByIdGet,
  categoryPost,
  categoryPut,
  categoryDelete
};
