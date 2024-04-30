const { user } = require("../../db");
const { createUserInAuthZero } = require("./authZeroApi");

const createUser = async ({
  user_name,
  email_address,
  password,
  picture,
  idAuth0,
}) => {
  let newUser = {};

  //Validate data provided on the body request
  if (!email_address || !password) {
    throw new Error("Data is missing: server can't create user");
  } else {
    if (idAuth0) {
      const checkUser = await user.findOne({
        where: {
          idAuth0: idAuth0,
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
      });
    } else {
      const auth0user = await createUserInAuthZero(email_address, password);
      if (auth0user) {
        console.log(auth0user);
        newUser = await user.create({
          user_name: auth0user.name,
          email_address,
          idAuth0: auth0user.user_id,
          picture: auth0user.picture,
          password: password,
        });
      }
    }
  }
  return newUser;
};

module.exports = createUser;
