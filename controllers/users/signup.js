const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../middlewares");

const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  // from Bogdan
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify email please</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarURL: avatarURL,
      subscription: "starter",
      verificationToken,
    },
  });
};

module.exports = signup;
