const { user } = require("../../db");
const findUserByName = async (user_name) => {
  const usuario = await user.findOne({
    where: { user_name: user_name },
  });
  return usuario;
};

module.exports = findUserByName;
