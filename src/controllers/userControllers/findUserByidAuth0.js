const { user, favorite } = require("../../db");

const findUserByidAuth0 = async (idAuth0) => {
  const usuario = await user.findOne({
    where: { idAuth0: idAuth0 },
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
        "book_name",
        "description",
        "book_picture",
        "book_price",
        "book_quantity",
        "book_author",
        "book_id",
        "fav_id",
      ],
    },
  });
  return usuario;
};

module.exports = findUserByidAuth0;
