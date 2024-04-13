const { book } = require("../../db");

const deletebook = async (indice) => {
  if (!indice) {
    throw new Error("indice must be provided to delete book");
  }
  const booktodelete = await book.findByPk(indice);
  console.log(booktodelete);
  if (!booktodelete) {
    throw new Error("book not found");
  }
  //   await booktodelete.destroy();
  booktodelete.destroy();
  return booktodelete.dataValues;
};

module.exports = deletebook;
