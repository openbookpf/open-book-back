const { favorite } = require("../../db");

const allFavorites = () => {
  const favoritos = favorite.findAll();
  return favoritos;
};

module.exports = allFavorites;
