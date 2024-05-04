const { user } = require("../../db");

const findUserByidAuth0 = async (idAuth0) => {
  const usuario = await user.findOne({
    where: { idAuth0: idAuth0 },
  });
  return usuario;
};

module.exports = findUserByidAuth0;
