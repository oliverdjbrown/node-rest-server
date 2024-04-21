const auth = require("./auth.controller");
const category = require("./category.controller");
const product = require("./product.controller");
const search = require("./search.controller");
const upload = require("./upload.controller");
const user = require("./user.controller");

module.exports = {
    ...auth,
    ...category,
    ...product,
    ...search,
    ...upload,
    ...user
}