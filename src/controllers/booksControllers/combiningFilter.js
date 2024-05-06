const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
  user,
} = require("../../db");
const { Op, fn, col } = require("sequelize");
const changeBookFormat = require("./changeBookFormat");

const combiningFilter = async ({
  authorArray,
  genreArray,
  minPrice,
  maxPrice,
  Booklanguage,
}) => {
  var result;

  if (minPrice || maxPrice) {
    result = await book.findAll({
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
      where: {
        price: {
          [Op.between]: [minPrice ? minPrice : 0, maxPrice ? maxPrice : 1000],
        },
      },
      include: [
        {
          model: author,
          attributes: ["name"],
        },
        {
          model: genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
        { model: editorial, attributes: ["name"] },
        {
          model: language,
          attributes: ["name"],
          where: {
            name: {
              [Op.iLike]: `%${Booklanguage ? Booklanguage : ""}%`,
            },
          },
        },
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
  } else {
    result = await book.findAll({
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
        {
          model: author,
          attributes: ["name"],
        },
        {
          model: genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
        { model: editorial, attributes: ["name"] },
        {
          model: language,
          attributes: ["name"],
          where: {
            name: {
              [Op.iLike]: `%${Booklanguage ? Booklanguage : ""}%`,
            },
          },
        },
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
  }

  const formattedBooks = result.map((book) => changeBookFormat(book));
  if (authorArray.length || genreArray.length) {
    const newbooks = formattedBooks.filter((book) => {
      if (genreArray.length && authorArray.length) {
        return (
          authorArray.includes(book.author) &&
          genreArray.some((genre) => book.genres.includes(genre))
        );
      } else {
        if (!genreArray.length) {
          return authorArray.includes(book.author);
        } else {
          return genreArray.some((genre) => book.genres.includes(genre));
        }
      }
    });
    return newbooks;
  } else {
    return formattedBooks;
  }
};

module.exports = combiningFilter;
