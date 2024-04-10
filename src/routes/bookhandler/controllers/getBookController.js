const { book, stock } = require("../../../db");

const getBookController = async () => {
  const books = await book.findAll();
  return books;
};

module.exports = getBookController;
