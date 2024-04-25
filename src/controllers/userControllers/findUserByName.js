const { user } = require("../../db");
const findUserByName = (user_name) => {
  const usuario = user.findOne({
    where: { user_name: user_name },
  });
  return usuario;
};

module.exports = findUserByName;
