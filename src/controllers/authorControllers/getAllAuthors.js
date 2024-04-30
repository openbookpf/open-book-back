const { author } = require("../../db");

const getAllAuthors = async (name, description) => {
  // console.log(name);
  const allAuthors = await author.findAll();
  return allAuthors;
};

module.exports = getAllAuthors;
