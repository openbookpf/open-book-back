const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
} = require("../../db");
const { Op, fn, col } = require("sequelize");
const changeBookFormat = require("./changeBookFormat");

const combiningFilter = async ({
  authorArray,
  genreArray,
  minPrice,
  maxPrice,
}) => {
  var result;
  console.log(authorArray);
  console.log(genreArray);
  console.log(minPrice);
  console.log(maxPrice);
  if (minPrice || maxPrice) {
    result = await book.findAll({
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
  } else {
    result = await book.findAll({
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
  }

  const formattedBooks = result.map((book) => changeBookFormat(book));
  const newbooks = formattedBooks.filter(
    (book) =>
      authorArray.includes(book.author) ||
      genreArray.some((genre) => book.genres.includes(genre))
  );
  return newbooks;
};

module.exports = combiningFilter;
