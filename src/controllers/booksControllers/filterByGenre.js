const { book } = require("../../db");

const filterByGenre = async (genero) => {
  const filteredBooks = await book.findAll({
    where: { genre: genero },
  });
  return filteredBooks;
};

module.exports = filterByGenre;
