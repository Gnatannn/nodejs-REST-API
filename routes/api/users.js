const express = require("express");

const router = express.Router();

const { validation, auth, ctrlWrapper, upload } = require("../../middlewares");
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(controller.updateAvatar)
);

module.exports = router;
