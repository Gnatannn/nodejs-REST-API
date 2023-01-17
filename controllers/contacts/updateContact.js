const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new NotFound();
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
