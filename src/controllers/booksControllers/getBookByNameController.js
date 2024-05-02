const { Op, fn, col } = require("sequelize");
const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
  user,
} = require("../../db");
const changeBookFormat = require("./changeBookFormat");

const getBookByNameController = async (name) => {
  if (!name) {
    throw new Error("You must provide a book name");
  }

  const foundBooks = await book.findAll({
    where: {
      book_title: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: [
      "ISBN",
      // [fn("AVG", col("reviews.rating")), "average_rating"],
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
  const formattedBooks = foundBooks.map((book) => changeBookFormat(book));
  return formattedBooks;
};

module.exports = getBookByNameController;
