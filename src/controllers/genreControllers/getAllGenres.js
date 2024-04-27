const { genre } = require("../../db");

const getAllGenres = async () => {
  const allGenres = await genre.findAll();

  return allGenres;
};

module.exports = getAllGenres;
