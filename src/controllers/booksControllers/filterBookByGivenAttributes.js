const { book } = require("../../db");

const filterByAuthor = async (autor) => {
  const books = await book.findAll({
    where: { author: autor },
  });
  return books;
};

module.exports = filterByAuthor;
