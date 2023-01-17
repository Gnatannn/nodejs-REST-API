const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const updateStatusFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      res.json({ message: "Missing field favorite" });
    }
    const result = await Contact.findByIdAndUpdate(contactId, favorite, {
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

module.exports = updateStatusFavorite;
