const { author } = require("../../db");

const createAuthor = async (name, description) => {
  console.log(name);
  const newAuthor = await author.create({
    name,
    description,
  });
  return newAuthor;
};

module.exports = createAuthor;
