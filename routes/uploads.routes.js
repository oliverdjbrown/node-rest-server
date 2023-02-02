const { Router } = require("express");
const { check } = require("express-validator");
const { uploads } = require("../controllers/uploads.controller");
const { validateFields } = require("../middlewares");

const router = Router();

router.post('/', uploads);


module.exports = router;