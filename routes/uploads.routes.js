const { Router } = require("express");
const { check } = require("express-validator");
const { uploads, updateUpload, updatePictureCloudinary, showImages } = require("../controllers/uploads.controller");
const { allowedCollections } = require("../helpers");
const { validateFields, validateFileToBeUpload } = require("../middlewares");

const router = Router();

router.post('/', validateFileToBeUpload, uploads);

router.put('/:collection/:id',[
    validateFileToBeUpload,
    check("id", "is not a valid id").isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updatePictureCloudinary);

router.get('/:collection/:id',[    
    check("id", "is not a valid id").isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], showImages);


module.exports = router;