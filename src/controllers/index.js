const auth = require("./auth.controller");
const category = require("./categories.controller");
const product = require("./products.controller");
const search = require("./search.controller");
const upload = require("./uploads.controller");
const user = require("./users.controller");

module.exports = {
    ...auth,
    ...category,
    ...product,
    ...search,
    ...upload,
    ...user
}