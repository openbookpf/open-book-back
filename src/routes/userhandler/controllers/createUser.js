const { user } = require("../../../db");

const createUser = async ({
  user_name,
  email_address,
  phone_number,
  password,
}) => {
  //Validate data provided on the body request
  if (!user_name || !email_address || !phone_number || !password) {
    throw new Error("Data is missing: server can't create user");
  }

  //create new user
  const newUser = await user.create({
    user_name,
    email_address,
    phone_number,
    password,
  });
  return newUser;
};

module.exports = createUser;
