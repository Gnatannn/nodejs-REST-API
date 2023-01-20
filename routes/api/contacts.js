const express = require("express");

const { contacts: controller } = require("../../controllers");

const router = express.Router();

const { validation } = require("../../middlewares/validation");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validation(joiSchema), controller.addContact);

router.delete("/:contactId", controller.deleteContact);

router.put("/:contactId", validation(joiSchema), controller.updateContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  controller.updateStatusFavorite
);

module.exports = router;
