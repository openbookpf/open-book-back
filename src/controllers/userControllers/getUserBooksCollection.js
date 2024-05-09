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
    group: ["user_id"],
  });

  let arrayOfISBN = searchedUser.orders.map((order) => {
    return order.order_items.map((item) => {
      return item.book.ISBN;
    });
  });

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  arrayOfISBN = removeDuplicates(arrayOfISBN[0]);

  const collection = await Promise.all(
    arrayOfISBN.map(async (ISBN) => {
      return await getBookByIdController(ISBN);
    })
  );

  return { purchase_books: collection };
};
module.exports = getUserBookCollection;
