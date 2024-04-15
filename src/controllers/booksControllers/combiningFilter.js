const { Op } = require("sequelize");
const { book } = require("../../db");

const combiningFilter = async (author, genre, min, max) => {
  const result = await book.findAll({
    where: {
      author: { [Op.iLike]: `%${author}%` },
      genre: { [Op.iLike]: `%${genre}%` },
      price: { [Op.between]: [Number(min), Number(max)] },
    },
  });
  return result;
};

module.exports = combiningFilter;

// genre: genre,
//       price: { [Op.between]: [min, max] },
