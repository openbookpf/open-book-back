const { book } = require("../../db");
// const datasos = require("../../../utils/datos");

const getBookByIdController = async (id) => {
  console.log("this is the id", id);
  if (!id) {
    throw new Error("You must provide an ID");
  }
  const foundBook = await book.findByPk(id);
  if (foundBook) {
    return foundBook;
  } else {
    throw new Error(`The book with the provided ID: ${id} does not exist`);
  }
};

module.exports = getBookByIdController;
