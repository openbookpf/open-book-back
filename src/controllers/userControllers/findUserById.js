const { user } = require("../../db");

const findUserById = (user_id) => {
  const usuario = user.findByPk(user_id);
  return usuario;
};

module.exports = findUserById;
