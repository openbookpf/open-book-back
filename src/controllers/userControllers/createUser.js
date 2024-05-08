const { user } = require("../../db");
const { createUserInAuthZero } = require("./authZeroApi");

const createUser = async ({
  user_name,
  email_address,
  password,
  picture,
  idAuth0,
  user_type,
}) => {
  let newUser = {};
  console.log(email_address);
  console.log(password);
  //Validate data provided on the body request
  if (!email_address) {
    throw new Error("Data is missing: server can't create user");
  } else {
    if (idAuth0) {
      const checkUser = await user.findOne({
        where: {
          idAuth0: idAuth0,
          email_address: email_address,
        },
      });
      if (checkUser) {
        throw new Error("User already Exists");
      }
      newUser = await user.create({
        user_name,
        email_address,
        picture,
        idAuth0,
        user_type:
          email_address === "openbooklibrary.dev@gmail.com" ||
          user_type === "admin"
            ? "admin"
            : "shopper",
      });
    } else {
      const auth0user = await createUserInAuthZero(
        email_address,
        password,
        user_type
      );
      if (auth0user) {
        newUser = await user.create({
          user_name: auth0user.name,
          email_address,
          idAuth0: auth0user.user_id,
          picture: auth0user.picture,
          password: password,
          user_type: user_type,
        });
      }
    }
  }
  return newUser;
};

module.exports = createUser;
