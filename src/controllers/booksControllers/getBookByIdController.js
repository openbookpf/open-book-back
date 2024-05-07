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

const getBookByIdController = async (id) => {
  const foundBook = await book.findByPk(id, {
    attributes: [
      "ISBN",
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
  if (foundBook) {
    const formattedBook = changeBookFormat(foundBook);
    return formattedBook;
  } else {
    throw new Error(`The book with the provided ID: ${id} does not exist`);
  }
};

module.exports = getBookByIdController;
