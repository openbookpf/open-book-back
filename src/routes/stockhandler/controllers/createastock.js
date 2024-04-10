// const { stock, book } = require("../../../db");

// const createastock = async (newstock) => {
//   const { quantity } = newstock;
//   const stocke = await stock.create({ quantity });
//   return stocke;
// };

// module.exports = createastock;

const { stock, book } = require("../../../db");

const createastock = async (newstock) => {
  const { quantity, ISBN } = newstock;
  const Book = await book.findByPk(ISBN);
  if (!Book) {
    throw new Error("book not found");
  }
  const Stock = await stock.create({ quantity, ISBN });
  return Stock;
};

module.exports = createastock;
