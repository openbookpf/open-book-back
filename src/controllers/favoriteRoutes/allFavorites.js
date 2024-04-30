const { favorite } = require("../../db");

const allFavorites = async () => {
  const favoritos = await favorite.findAll();
  return favoritos;
};

module.exports = allFavorites;
