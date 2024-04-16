const { book } = require("../../db");

const getBookByIdController = async (id) => {
  const foundBook = await book.findByPk(id);
  if (foundBook) {
    return foundBook;
  } else {
    throw new Error(`The book with the provided ID: ${id} does not exist`);
  }
};

module.exports = getBookByIdController;
