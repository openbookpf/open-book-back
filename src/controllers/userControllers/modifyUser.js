const { user } = require("../../db");
const { modifyUserInAuthZeroById } = require("./authZeroApi");

const cleanUserDataForUpdate = (data) => {
  const objectToUpdate = {};
  Object.keys(data).forEach((porperty) => {
    if (
      data[porperty] &&
      porperty !== "email_address" &&
      porperty !== "is_active"
    ) {
      objectToUpdate[porperty] = data[porperty];
    } else {
      objectToUpdate[porperty] = data[porperty];
    }
  });

  return objectToUpdate;
};

const getFomattedUserDataForAuth0 = (data, idAuth0) => {
  const bodyForRequestToTheAuth0Api = {
    blocked: !data.is_active,
    name: data.user_name,
    picture: data.picture,
    password: data.data,
    connection:
      idAuth0.split("|")[0] !== "google-oauth2"
        ? "Username-Password-Authentication"
        : "google-oauth2",
  };

  const finalObject = {};

  Object.keys(bodyForRequestToTheAuth0Api).forEach((porperty) => {
    if (bodyForRequestToTheAuth0Api[porperty] && porperty !== "block") {
      finalObject[porperty] = bodyForRequestToTheAuth0Api[porperty];
    } else {
      finalObject[porperty] = bodyForRequestToTheAuth0Api[porperty];
    }
  });

  return finalObject;
};

// const {
//   user_name,
//   lastname,
//   email_address,
//   picture,
//   verified_email,
//   phone_number,
//   password,
//   adress_street,
//   adress_cp,
//   birthdate,
//   date_creation,
//   quantity_review,
//   is_active,
//   user_type,
//   favorites,
// } = data;

const modifyUser = async (user_id, updatedInfo) => {
  let modifiedUserFromAuthZero;

  const objectToUpdateForTheDatabase = cleanUserDataForUpdate(updatedInfo);

  const foundUser = await user.findOne({
    where: { idAuth0: user_id },
  });

  if (foundUser) {
    await foundUser.update(objectToUpdateForTheDatabase);

    const objectForAuth0 = getFomattedUserDataForAuth0(
      objectToUpdateForTheDatabase,
      user_id
    );

    modifiedUserFromAuthZero = await modifyUserInAuthZeroById(
      user_id,
      objectForAuth0
    );
    return foundUser;
  }
  throw new Error("user not found");
};

module.exports = modifyUser;
