const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.saltAndHash = async function (password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

exports.compare = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};
