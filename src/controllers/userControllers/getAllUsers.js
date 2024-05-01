const { user, favorite } = require("../../db");

const getAllUsers = async () => {
  const allUsers = await user.findAll({
    attributes: [
      "idAuth0",
      "user_name",
      "lastname",
      "email_address",
      "picture",
      "verified_email",
      "phone_number",
      "password",
      "adress_street",
      "adress_cp",
      "birthdate",
      "date_creation",
      "quantity_review",
      "is_active",
      "user_type",
    ],
    include: {
      model: favorite,
      attributes: ["book_name", "description"],
    },
  });
  return allUsers;
};
module.exports = getAllUsers;
