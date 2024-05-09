const { user, order, book, order_item } = require("../../db");
const getBookByIdController = require("../booksControllers/getBookByIdController");

const getUserBookCollectionSecondVersion = async (idAuth0) => {
  const foundUser = await user.findOne({
    where: {
      idAuth0: idAuth0,
    },
  });
  const foundOrders = await order.findAll({
    where: {
      userUserId: foundUser.user_id,
    },
    include: [
      {
        model: order_item,
        attributes: ["id", "quantity"],
        include: {
          model: book,
          attributes: ["book_title", "ISBN"],
        },
      },
    ],
  });

  // let arrayOfISBN = searchedUser.orders.map((order) => {
  //   return order.order_items.map((item) => {
  //     return item.book.ISBN;
  //   });
  // });

  // function removeDuplicates(arr) {
  //   return arr.filter((item, index) => arr.indexOf(item) === index);
  // }

  // arrayOfISBN = removeDuplicates(arrayOfISBN[0]);

  // const collection = await Promise.all(
  //   arrayOfISBN.map(async (ISBN) => {
  //     return await getBookByIdController(ISBN);
  //   })
  // );

  return { purchase_books: foundOrders };
};
module.exports = getUserBookCollectionSecondVersion;
