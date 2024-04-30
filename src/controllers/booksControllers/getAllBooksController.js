const { fn, col } = require("sequelize");
const changeBookFormat = require("./changeBookFormat");
const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
} = require("../../db");

const getAllBooksController = async () => {
  //Query all the attributes needed for the response and adding the average calculated attribute
  let allBooks = await book.findAll({
    attributes: [
      "ISBN",
      [fn("AVG", col("reviews.rating")), "average_rating"],
      "book_title",
      "book_cover_url",
      "book_description",
      "price",
      "quantity",
      "book_status",
      "available",
      "year_of_edition",
      "age_segment",
    ],
    include: [
      { model: author, attributes: ["name"] },
      { model: genre, attributes: ["name"], through: { attributes: [] } },
      { model: editorial, attributes: ["name"] },
      { model: language, attributes: ["name"] },
      {
        model: review,
        as: "reviews",
        attributes: [],
      },
    ],
    group: [
      "book.ISBN",
      "author.id",
      "genres.id",
      "editorial.id",
      "language.id",
    ],
  });

  //Formatting the data for the response
  const formattedBooks = allBooks.map((book) => changeBookFormat(book));

  return formattedBooks;
};

module.exports = getAllBooksController;
