const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
} = require("../../db");
const { fn, col } = require("sequelize");
const changeBookFormat = require("./changeBookFormat");

const getBookByIdController = async (id) => {
  const foundBook = await book.findByPk(id, {
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
  if (foundBook) {
    const formattedBook = changeBookFormat(foundBook);
    return formattedBook;
  } else {
    throw new Error(`The book with the provided ID: ${id} does not exist`);
  }
};

module.exports = getBookByIdController;
