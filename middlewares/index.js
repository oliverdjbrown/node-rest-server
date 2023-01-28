const validateJWT = require("../middlewares/validate-jwt.middleware");
const validateRoles = require("../middlewares/validate-roles.middleware");
const validateFields = require("../middlewares/validate-fields.middleware");

module.exports = {
    ...validateFields,
    ...validateRoles,
    ...validateJWT
}