const { response } = require("express");

allowedCollections = ["users", "categories", "products", "roles"];

const search = (req, res = response) => {
  const { collection, term } = req.params;

  res.json({
    collection,
    term,
    message: "Buscar",
  });
};

module.exports = {
  search,
};
