const { Sequelize, literal } = require("sequelize");
const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
  user,
  order_item,
  order,
  payment,
} = require("../../db");

const getAllPaymentsAndOrders = async () => {
  const allPayments = await payment.findAll({
    attributes: ["id", "id_payment", "date", "amount"],

    include: {
      model: order,
      attributes: ["order_id", "total_amount"],
      include: {
        model: order_item,
        attributes: ["quantity", "subtotal"],
        include: {
          model: book,
          attributes: ["ISBN", "book_title"],
          include: {
            model: genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        },
      },
    },
  });

  //Getting the total Amount

  let total_order_amounts = 0;
  const myPayments = await payment.findAll();

  myPayments.forEach((payment) => {
    total_order_amounts += payment.amount;
  });

  const allGenres = await genre.findAll();

  const countSalesPerGenre = (searchedGenre) => {
    let count = 0;
    allPayments.map((paymentDetail) => {
      paymentDetail.order.order_items.forEach((item) => {
        if (item.book.genres.some((genre) => genre.name === searchedGenre)) {
          count = count + item.quantity;
        }
      });
    });

    return count;
  };

  //Genre statistics

  const genresArray = allGenres.map((genre) => {
    return { [genre.name]: countSalesPerGenre(genre.name) };
  });

  //Saled Books

  let soldBooks = 0;

  const items = await order_item.findAll();
  items.forEach((item) => {
    soldBooks += item.quantity;
  });

  return {
    total_sales_amount: Number(total_order_amounts.toFixed(2)),
    total_sold_books: soldBooks,

    books_sold_per_genre: genresArray,
    details: allPayments,
  };
};

module.exports = getAllPaymentsAndOrders;
