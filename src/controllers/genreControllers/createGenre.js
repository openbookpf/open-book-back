const { genre } = require("../../db");

const createGenre = async (name) => {
  const search = await genre.findOne({
    where: {
      name: name,
    },
  });

  if (search) {
    throw new Error("Genre already exists");
  }

  const newGenre = await genre.create({
    name,
  });
  return newGenre;
};

module.exports = createGenre;
