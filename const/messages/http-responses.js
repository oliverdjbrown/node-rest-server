const status200 = { message: "ok" };
const status201 = { message: "created" };
const status202 = { message: "accepted" };

const status400 = { message: "Bad Request" };
const status401 = { message: "Unauthorized" };
const status402 = { message: "Payment Required" };
const status403 = { message: "Forbidden" };
const status404 = { message: "Not Found" };

const status500 = { message: "Internal Server Error" };
const status501 = { message: "Not Implemented" };
const status502 = { message: "Bad Gateway" };
const status503 = { message: "Service Unavailable" };

const contactAdmin = { message: "Contact the administrator" };
const invalidUser = { message: "Invalid User" };
const invalidUserOrPassword = { message: "user or password is invalid" };

module.exports = {
  status200,
  status201,
  status202,
  status400,
  status401,
  status402,
  status403,
  status404,
  status500,
  status501,
  status502,
  status503,
  contactAdmin,
  invalidUser,
  invalidUserOrPassword
};
