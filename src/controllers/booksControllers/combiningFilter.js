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

const combiningFilter = async (authorName, genreName, minPrice, maxPrice) => {
  var result;
  console.log(authorName);
  console.log(genreName);
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
          where: { name: { [Op.iLike]: `%${authorName}%` } },
        },
        {
          model: genre,
          attributes: ["name"],
          where: { name: { [Op.iLike]: `%${genreName}%` } },
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
          where: { name: { [Op.iLike]: `%${authorName}%` } },
        },
        {
          model: genre,
          attributes: ["name"],
          where: { name: { [Op.iLike]: `%${genreName}%` } },
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

  return formattedBooks;
};

module.exports = combiningFilter;
