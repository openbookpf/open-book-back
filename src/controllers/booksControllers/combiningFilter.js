const { Op } = require("sequelize");
const { book } = require("../../db");

const combiningFilter = async (author, genre, min, max) => {
  let result;
  if (min || max) {
    result = await book.findAll({
      where: {
        author: { [Op.iLike]: `%${author}%` },
        genre: { [Op.iLike]: `%${genre}%` },
        price: {
          [Op.between]: [Number(min ? min : 0), Number(max ? max : 1000)],
        },
      },
    })
  } else {
    result = await book.findAll({
      where: {
        author: { [Op.iLike]: `%${author}%` },
        genre: { [Op.iLike]: `%${genre}%` },
      },
    })
  }

  return result;
};

module.exports = combiningFilter;

