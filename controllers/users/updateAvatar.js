const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const amendAvatar = async (path) => {
  const avatar = Jimp.read(path);
  await (
    await avatar
  )
    .autocrop()
    .contain(
      250,
      250,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )
    .writeAsync(path);
};

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const { _id } = req.user;
  const newAvatarName = `${_id}_${filename}`;
  try {
    const resultUpload = path.join(avatarDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", newAvatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    amendAvatar(avatarURL);
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
