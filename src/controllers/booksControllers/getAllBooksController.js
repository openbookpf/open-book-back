const { book, author, genre, language, editorial } = require("../../db");

const getAllBooksController = async () => {
  const books = await book.findAll({
    include: [
      { model: author, attributes: ["name"], through: { attributes: [] } },
      { model: genre, attributes: ["name"], through: { attributes: [] } },
      { model: editorial, attributes: ["name"], through: { attributes: [] } },
      { model: language, attributes: ["name"], through: { attributes: [] } },
    ],
  });
  return books;
};

module.exports = getAllBooksController;
