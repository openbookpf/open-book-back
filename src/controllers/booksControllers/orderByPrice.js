const { book } = require("../../db");

const orderbyprice = async () => {
  const allbooks = await book.findAll();
  const neworder = allbooks.sort((a, b) => a.price - b.price);
  return neworder;
};

module.exports = orderbyprice;
