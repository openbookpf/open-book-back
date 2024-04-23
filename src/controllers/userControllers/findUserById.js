const { user } = require("../../db");

const findUserById = (id) => {
  const usuario = user.findByPk(id);
  return usuario;
};

module.exports = findUserById;
