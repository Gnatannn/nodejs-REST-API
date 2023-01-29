const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const sendEmail = require("../../middlewares");
const { BASE_URL } = process.env;

const repeatVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const { verificationToken } = user;

  const verificationEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify email please</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = repeatVerification;
