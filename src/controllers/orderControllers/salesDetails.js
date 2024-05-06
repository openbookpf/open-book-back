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
  const allPayments = await payment.findAll();

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let amountPerMonth2023 = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ];

  let numberSoldBooksPerMonth2023 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let amountPerMonth2024 = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ];

  let numberSoldBooksPerMonth2024 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 1; i <= monthNames.length; i++) {
    allPayments.forEach((payment) => {
      if (
        Number(payment.date.split("/")[1]) === i &&
        payment.date.split("/")[2] === "2023"
      ) {
        amountPerMonth2023[i - 1] =
          Number(amountPerMonth2023[i - 1].toFixed(2)) +
          Number(payment.amount.toFixed(2));
      }
    });
  }

  for (let i = 1; i <= monthNames.length; i++) {
    allPayments.forEach((payment) => {
      if (
        Number(payment.date.split("/")[1]) === i &&
        payment.date.split("/")[2] === "2024"
      ) {
        amountPerMonth2024[i - 1] =
          Number(amountPerMonth2023[i - 1].toFixed(2)) +
          Number(payment.amount.toFixed(2));
      }
    });
  }

  const paymentsWithDetails = await payment.findAll({
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

  for (let i = 1; i <= monthNames.length; i++) {
    paymentsWithDetails.forEach((payment) => {
      if (
        Number(payment.date.split("/")[1]) === i &&
        payment.date.split("/")[2] === "2023"
      ) {
        payment.order.order_items.forEach((item) => {
          numberSoldBooksPerMonth2023[i - 1] =
            numberSoldBooksPerMonth2023[i - 1] + item.quantity;
        });
      }
    });
  }

  for (let i = 1; i <= monthNames.length; i++) {
    paymentsWithDetails.forEach((payment) => {
      if (
        Number(payment.date.split("/")[1]) === i &&
        payment.date.split("/")[2] === "2024"
      ) {
        payment.order.order_items.forEach((item) => {
          numberSoldBooksPerMonth2024[i - 1] =
            numberSoldBooksPerMonth2024[i - 1] + item.quantity;
        });
      }
    });
  }

  const allGenres = await genre.findAll();

  const countSalesPerGenre = (searchedGenre) => {
    let count = 0;
    paymentsWithDetails.map((paymentDetail) => {
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

  const sortedSalesByGenre = genresArray.sort((a, b) => {
    const valueA = Object.values(a)[0];
    const valueB = Object.values(b)[0];
    return valueB - valueA;
  });

  const topSoldGenres = sortedSalesByGenre.slice(0, 4).map((item) => {
    const genre = Object.keys(item)[0];
    const value = Object.values(item)[0];
    return {
      value: value,
      genre: genre,
    };
  });

  return {
    2023: {
      months: monthNames,
      number_of_sold_books: numberSoldBooksPerMonth2023,
      total_amount_sold_books: amountPerMonth2023,
    },
    2024: {
      months: monthNames,
      number_of_sold_books: numberSoldBooksPerMonth2024,
      total_amount_sold_books: amountPerMonth2024,
    },
    topSoldGenres: topSoldGenres,
  };
};

module.exports = getAllPaymentsAndOrders;
