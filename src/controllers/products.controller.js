const { response } = require("express");
const { Product } = require("../models");
const { productExist } = require("../../constants");

const productGet = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "category")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    products,
  });
};

const productByIdGet = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("user", "name");

  res.status(200).json(product);
};

const productPost = async (req, res = response) => {
  
  const { state, user, ...body } = req.body
  const product = body.product.toUpperCase()
  
  const productDB = await Product.findOne({ product });  
  
  if (productDB) return res.status(400).json(productExist);

  const data = {
    ...body,
    product,    
    user: req.user._id,
  };

  const newProduct = new Product(data);
  await newProduct.save();
  res.status(201).json(newProduct);
};

const productPut = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  if(data.product) data.product = data.product.toUpperCase();
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(product);
};

const productDelete = async (req, res = response) => {
  const {id} = req.params;  
  
  const product = await Product.findByIdAndUpdate(id, {state: false}, {new: true});  

  res.json({    
    product
  });
};

module.exports = {
  productGet,
  productByIdGet,
  productPost,
  productPut,
  productDelete
};