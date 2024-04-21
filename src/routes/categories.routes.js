const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields, isAdmin } = require("../middlewares");
const {
  categoryPost,
  categoryPut,
  categoryGet,
  categoryByIdGet,
  categoryDelete,
} = require("../controllers/categories.controller");

const { categoryExistById } = require("../../helpers/db-validators");

const router = Router();


router.get("/", categoryGet);

router.get(
  "/:id",
  [
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  categoryByIdGet
);

router.post(
  "/",
  [
    validateJWT,
    check("category", "category is required").not().isEmpty(),    
    validateFields,
  ],
  categoryPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("category", "category is required").not().isEmpty(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  categoryPut
);

router.delete("/:id", [
    validateJWT, 
    isAdmin,
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields
], categoryDelete);

module.exports = router;
