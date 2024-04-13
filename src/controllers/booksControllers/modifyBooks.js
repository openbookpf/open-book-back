const { book } = require("../../db");

const modifyBook = async (indice, newobject) => {
  const findbook = await book.findOne({
    where: { ISBN: indice },
  });
  if (findbook) {
    await findbook.update(newobject);
    return findbook;
  }
  throw new Error("book not found");
};

module.exports = modifyBook;
