const { genre } = require("../../db");

const getAllGenres = async () => {
  const allGenres = await genre.findAll();
  let formatted = [];

  allGenres.map((g) => {
    g.get({ plain: true });
    formatted.push(g.name);
  });

  return formatted;
};

module.exports = getAllGenres;
