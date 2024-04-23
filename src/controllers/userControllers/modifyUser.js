const { user } = require("../../db");

const modifyUser = async (id, object) => {
  const finduser = await user.findOne({
    where: { id: id },
  });
  if (finduser) {
    await finduser.update(object);
    return finduser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
