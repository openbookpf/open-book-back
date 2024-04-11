const { user } = require("../../db");

const deleteUser = async (id) => {
  //Validate data provided on the params
  if (!id) {
    throw new Error("Id must be provided to delete an User");
  }

  //Find User
  const userForDeletion = await user.findByPk(id);

  //If user doesn't exist, throw an error
  if (!userForDeletion) {
    throw new Error("User not found");
  }

  //Delete User

  await userForDeletion.destroy();
  return userForDeletion;
};

module.exports = deleteUser;
