const { user } = require("../../db");

const modifyUser = async (user_name, object) => {
  const finduser = await user.findOne({
    where: { user_name: user_name },
  });
  if (finduser) {
    await finduser.update(object);
    return finduser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
