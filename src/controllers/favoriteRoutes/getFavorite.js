const { favorite } = require("../../db");

const getFavorite = (user_id, fav_id) => {
  const findFav = favorite.findAll({
    where: { userUserId: user_id },
  });
  if (findFav !== null) {
    findFav.filter((fav) => fav.fav_id !== fav_id);
  }
  return findFav;
};

module.exports = getFavorite;
