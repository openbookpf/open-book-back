const { book } = require("../../db");

const modifyBook = async (indice, newobject) => {
  const foundBook = await book.findOne({
    where: { ISBN: indice },
  });
  if (foundBook) {
    await foundBook.update(newobject);
    return foundBook;
  }
  throw new Error("book not found");
};

module.exports = modifyBook;
