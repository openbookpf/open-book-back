const { user } = require("../../db");
const { modifyUserInAuthZeroById } = require("./authZeroApi");

const modifyUser = async (user_id, updatedInfo) => {
  let modifiedUserFromAuthZero;

  const { email, name } = updatedInfo;

  const foundUser = await user.findOne({
    where: { idAuth0: user_id },
  });

  if (foundUser) {
    await foundUser.update({ email_address: email, user_name: name });
    modifiedUserFromAuthZero = modifyUserInAuthZeroById(user_id, updatedInfo);
    return foundUser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
