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

const { categoryExistById } = require("../helpers/db-validators");

const router = Router();

//get categories - public route
router.get("/", categoryGet);

//get a category by id - public route
router.get(
  "/:id",
  [
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  categoryByIdGet
);

//create category - private route
router.post(
  "/",
  [
    validateJWT,
    check("category", "category is required").not().isEmpty(),
    //check('state', 'state is required').not().isEmpty(),
    //check('user', 'user is required').not().isEmpty(),
    validateFields,
  ],
  categoryPost
);

//update a category by id - private route
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

//delete a category by id - private route
router.delete("/:id", [
    validateJWT, 
    isAdmin,
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields
], categoryDelete);

module.exports = router;
