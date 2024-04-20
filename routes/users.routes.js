const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateJWT,
  isAdmin,
  hasRole,
  validateFields,
} = require("../middlewares");

const {
  isRole,
  emailExist,
  userExistById,
} = require("../helpers/db-validators");

const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users.controller");

const router = Router();

router.get(
  "/",
  [validateJWT ,validateFields],
  usersGet
);

router.post(
  "/",
  [    
    validateJWT,   
    check("name", "name is requerid").not().isEmpty(),
    check("password", "password is shorter than 6 characters").isLength({
      min: 6,
    }),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailExist),    
    check("rol").custom(isRole),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(userExistById),
    validateFields,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    hasRole("ADMIN_ROLE", "SALE_ROLE"),
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(userExistById),
    validateFields,
  ],
  userDelete
);

module.exports = router;
