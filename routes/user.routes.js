const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const { isRole, emailExist, userExistById } = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "name is requerid").not().isEmpty(),
    check("password", "password is shorter than 6 characters").isLength({
      min: 6,
    }),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailExist),
    //check('role', 'rol is not valid').isIn('ADMIN_ROLE, USER_ROLE'),    
    check("rol").custom(isRole),
    validateFields,
  ],
  userPost
);

router.put("/:id", [
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], userPut);

router.patch("/", userPatch);

router.delete("/:id", [
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], userDelete);

module.exports = router;
