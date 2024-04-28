const { user } = require("../../db");

const modifyUser = async (user_id, object) => {
  const finduser = await user.findOne({
    where: { user_id: user_id },
  });
  if (finduser) {
    await finduser.update(object);
    return finduser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
