const { favorite } = require("../../db");

const getFavorite = async (user_id, fav_id) => {
  const findFav = await favorite.findAll({
    where: { userUserId: user_id },
    attributes: [
      "fav_id",
      "book_name",
      "book_picture",
      "description",
      "book_id",
      "book_author",
      "book_quantity",
      "book_price",
      "userUserId",
    ],
  });
  const favorito = await findFav.find((fav) => fav.fav_id === Number(fav_id));
  await favorito.destroy();
  return favorito;
};

module.exports = getFavorite;
