const { book } = require("../../db");

const filterbygenre = async (genero) => {
  const books = await book.findAll({
    where: { genre: genero },
  });
  return books;
};

module.exports = filterbygenre;
