const express = require("express");

const { contacts: controller } = require("../../controllers");

const router = express.Router();

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(controller.getAllContacts));

router.get("/:contactId", ctrlWrapper(controller.getContactById));

router.post(
  "/",
  auth,
  validation(joiSchema),
  ctrlWrapper(controller.addContact)
);

router.delete("/:contactId", ctrlWrapper(controller.deleteContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(controller.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(controller.updateStatusFavorite)
);

module.exports = router;
