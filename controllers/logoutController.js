const User = require("../model/User");

const handlleLogout = async (req, res) => {
  // ON Client, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  //Is refreshToken in DB
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  // Delete the refresh token in DB
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = { handlleLogout };
