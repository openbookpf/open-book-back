const { book } = require("../../db");

const modifyBook = async (id, newobject) => {
  const foundBook = await book.findOne({
    where: { ISBN: id },
  });
  if (foundBook) {
    await foundBook.update(newobject);
    return foundBook;
  }
  throw new Error("book not found");
};

module.exports = modifyBook;
