const { book } = require("../../db");

const filterbyauthor = async (autor) => {
  const books = await book.findAll({
    where: { author: autor },
  });
  return books;
};

module.exports = filterbyauthor;
