const { user, favorite, book } = require("../../db");

const getAllUsers = async () => {
  const allUsers = await user.findAll({
    attributes: [
      "user_id",
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
      attributes: [
        "fav_id",
        "book_name",
        "description",
        "book_picture",
        "book_price",
        "book_quantity",
        "book_author",
      ],
    },
  });
  return allUsers;
};
module.exports = getAllUsers;
