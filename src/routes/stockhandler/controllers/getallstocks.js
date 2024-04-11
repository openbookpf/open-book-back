const { stock, book } = require("../../../db");

const getAllStocks = async () => {
  //   const allstock = await stock.findAll({
  //     include: {
  //       model: book,

  //     },
  //   });
  const books = await book.findAll({
    attributes: {
      exclude: ["book_cover_url", "book_description", "genre"],
    },
    include: {
      model: stock,
      required: true,
      attributes: ["quantity"],
    },
  });
  return books;
  //   return allstock;
};

module.exports = getAllStocks;
