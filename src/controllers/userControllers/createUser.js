const { user } = require("../../db");

const createUser = async ({
  name,
  // last_name,
  email,
  // email_verified,
  picture,
  // password,
  // phone_number,
  // adress_street,
  // adress_nro,
  // adress_cp,
  // birthdate,
  // date_creation,
  // quatity_review,
  // user_type,
}) => {
  //Validate data provided on the body request
  if (!name || !email || !picture) {
    throw new Error("Data is missing: server can't create user");
  }

  //create new user
  const newUser = await user.create({
    name,
    email,
    picture,
  });
  return newUser;
};

module.exports = createUser;
