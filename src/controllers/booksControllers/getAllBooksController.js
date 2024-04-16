const { book } = require("../../db");

const getAllBooksController = async () => {
  const books = await book.findAll();
  return books;
};

module.exports = getAllBooksController;
