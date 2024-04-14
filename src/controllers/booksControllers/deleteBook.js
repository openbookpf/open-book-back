const { book } = require("../../db");

const deleteBook = async (indice) => {
  if (!indice) {
    throw new Error("indice must be provided to delete book");
  }
  const bookToDelete = await book.findByPk(indice);

  if (!bookToDelete) {
    throw new Error("book not found");
  }
  //   await bookToDelete.destroy();
  bookToDelete.destroy();
  return bookToDelete.dataValues;
};

module.exports = deleteBook;
