const { user } = require("../../db");

const getAllUsers = async () => {
  const allUsers = await user.findAll();
  return allUsers;
};

module.exports = getAllUsers;
