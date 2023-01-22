const express = require("express");

const router = express.Router();

const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { joiLoginSchema, joiSignupSchema } = require("../../models/user");
const { users: controller } = require("../../controllers");

router.post(
  "/signup",
  validation(joiSignupSchema),
  ctrlWrapper(controller.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  ctrlWrapper(controller.login)
);

router.get("/current", auth, ctrlWrapper(controller.getCurrent));

router.post("/logout", auth, ctrlWrapper(controller.logout));

module.exports = router;
