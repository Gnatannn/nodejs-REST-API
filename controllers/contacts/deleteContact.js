const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = deleteContact;
