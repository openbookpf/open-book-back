const { author } = require("../../db");

const createAuthor = async (name, description) => {
  const newAuthor = await author.create({
    name,
    description,
  });
  return newAuthor;
};

module.exports = createAuthor;
