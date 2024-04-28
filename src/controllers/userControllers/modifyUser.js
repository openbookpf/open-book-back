const { user } = require("../../db");
const { modifyUserInAuthZeroById } = require("./authZeroApi");

const modifyUser = async (user_id, updatedInfo) => {
  let modifiedUserFromAuthZero;

  const finduser = await user.findOne({
    where: { idAuth0: user_id },
  });

  if (finduser) {
    await finduser.update(updatedInfo);
    modifiedUserFromAuthZero = modifyUserInAuthZeroById(user_id, updatedInfo);
    return finduser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
