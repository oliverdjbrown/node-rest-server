// HTTP Response Messages

const httpResponses = {
  status200: { message: "ok", code: 200 },
  status201: { message: "created", code: 201 },
  status202: { message: "accepted", code: 202 },
  status400: { message: "Bad Request", code: 400 },
  status401: { message: "Unauthorized", code: 401 },
  status402: { message: "Payment Required", code: 402 },
  status403: { message: "Forbidden", code: 403 },
  status404: { message: "Not Found", code: 404 },
  status500: { message: "Internal Server Error", code: 500 },
  status501: { message: "Not Implemented", code: 501 },
  status502: { message: "Bad Gateway", code: 502 },
  status503: { message: "Service Unavailable", code: 503 },
}


//User Messages
const contactAdmin = { message: "Contact the administrator" };
const invalidUser = { message: "Invalid User" };
const invalidUserOrPassword = { message: "user or password is invalid" };

//Categories Messages
const categoryExist = { message: "The category already exist." };

//Products Messages
const productExist = { message: "The product already exist." };

//Search Messages
const collectionExist = { message: "The collection is not allowed." };

//Upload Messages
const fileNotExist = { message: "No files were uploaded." };
const fileUploaded = { message: "File uploaded." };
const fileExtension = { message: "File extension not allowed." };

module.exports = {
  ...httpResponses,
  contactAdmin,
  invalidUser,
  invalidUserOrPassword,
  categoryExist,
  productExist,
  collectionExist,
  fileNotExist,
  fileUploaded,
  fileExtension,
};
