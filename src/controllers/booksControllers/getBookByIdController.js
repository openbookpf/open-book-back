const { book, author, genre, language, editorial } = require("../../db");

const getBookByIdController = async (id) => {
  const foundBook = await book.findByPk(id, {
    include: [
      { model: author, attributes: ["name"], through: { attributes: [] } },
      { model: genre, attributes: ["name"], through: { attributes: [] } },
      { model: editorial, attributes: ["name"], through: { attributes: [] } },
      { model: language, attributes: ["name"], through: { attributes: [] } },
    ],
  });
  if (foundBook) {
    return foundBook;
  } else {
    throw new Error(`The book with the provided ID: ${id} does not exist`);
  }
};

module.exports = getBookByIdController;
