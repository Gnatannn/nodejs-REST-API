const express = require("express");

const router = express.Router();

const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { joiLoginSchema, joiSignupSchema } = require("../../models/user");

router.post("/signup", validation(joiSignupSchema));

router.post("/login", validation(joiLoginSchema));

router.get("/current", auth);

router.get("/logout", auth);

module.exports = router;
