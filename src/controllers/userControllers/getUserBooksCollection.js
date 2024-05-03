const { user, order, book, order_item } = require("../../db");
const getBookByIdController = require("../booksControllers/getBookByIdController");

const getUserBookCollection = async (idAuth0) => {
  const searchedUser = await user.findOne({
    where: {
      idAuth0: idAuth0,
    },
    include: [
      {
        model: order,
        attributes: ["order_id"],
        include: {
          model: order_item,
          attributes: ["id", "quantity"],
          include: {
            model: book,
            attributes: ["book_title", "ISBN"],
          },
        },
      },
    ],
  });

  const arrayOfISBN = searchedUser.orders.map((order) => {
    return order.order_items.map((item) => {
      return item.book.ISBN;
    });
  });

  const collection = await Promise.all(
    arrayOfISBN[0].map(async (ISBN) => {
      return await getBookByIdController(ISBN);
    })
  );

  return { purchase_books: collection };
};
module.exports = getUserBookCollection;
