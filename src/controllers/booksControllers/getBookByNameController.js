const { Op } = require("sequelize");
const { book } = require("../../db");

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
  });
  return foundBooks;
};

module.exports = getBookByNameController;
