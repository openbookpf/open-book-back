const { book, stock } = require("../../../db");
// const datasos = require("../../../utils/datos");

const getBookByIdController = async (id) => {
  const books = await book.findOne(id, {
    include: {
      model: stock,
    },
  });
  if (books !== null) {
    return books;
  }
  //   const findbook = datasos.filter((book) => book.ISBN === id);

  //   //   const newobject = book.create(findbook)
  //   //   newobject.addStock()
  //   return findbook;
};

module.exports = getBookByIdController;
