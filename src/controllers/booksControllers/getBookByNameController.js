const { Op } = require("sequelize");
const { book, author, genre, language, editorial } = require("../../db");

const getBookByNameController = async (name) => {
  if (!name) {
    throw new Error("You must provide a book name");
  }

  const foundBooks = await book.findAll({
    where: {
      book_title: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      { model: author, attributes: ["name"], through: { attributes: [] } },
      { model: genre, attributes: ["name"], through: { attributes: [] } },
      { model: editorial, attributes: ["name"], through: { attributes: [] } },
      { model: language, attributes: ["name"], through: { attributes: [] } },
    ]
  });
  return foundBooks;
};

module.exports = getBookByNameController;
