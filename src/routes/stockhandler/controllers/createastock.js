const { Stock, Book } = require("../../../db");

const createastock = async (newstock) => {
  const { quantity, ISBN } = newstock;
  const book = await Book.findByPk(ISBN);
  if (!book) {
    throw Error("book not found");
  }
  const stock = await Stock.create({ quantity, ISBN });
  return stock;
};

module.exports = createastock;
