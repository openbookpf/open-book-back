const { fn, literal } = require("sequelize");
const changeBookFormat = require("./changeBookFormat");
const {
  user,
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
    subQuery: false,

    attributes: [
      "ISBN",
      "book_title",
      // [literal("ROUND(AVG(reviews.rating), 2)"), "average_rating"],
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
        attributes: ["rating", "comment", "date"],
        include: {
          model: user,
          attributes: ["user_name", "idAuth0"],
        },
      },
    ],
    group: [
      "book.ISBN",
      "author.id",
      "genres.id",
      "editorial.id",
      "language.id",
      "reviews.id",
      "reviews->user.user_id",
    ],
  });

  //Formatting the data for the response
  const formattedBooks = allBooks.map((book) => changeBookFormat(book));

  return formattedBooks;
};

module.exports = getAllBooksController;
