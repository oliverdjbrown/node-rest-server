const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields, isAdmin } = require("../middlewares");
const {
  productPost,
  productPut,
  productGet,
  productByIdGet,
  productDelete,
} = require("../controllers");

const { productExistById, categoryExistById } = require("../../helpers");

const router = Router();

router.get("/", productGet);

router.get(
  "/:id",
  [
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  productByIdGet
);

router.post(
  "/",
  [
    validateJWT,
    check("product", "product is required").not().isEmpty(),    
    check("category", "is not a valid id").isMongoId(),
    check("category").custom(categoryExistById),
    validateFields,
  ],
  productPost
);

router.put(
  "/:id",
  [
    validateJWT,    
    check("category", "is not a valid id").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  productPut
);

router.delete("/:id", [
    validateJWT, 
    isAdmin,
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(productExistById),
    validateFields
], productDelete);

module.exports = router;