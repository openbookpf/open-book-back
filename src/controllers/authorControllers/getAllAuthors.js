const { author } = require("../../db");

const getAllAuthors = async () => {
  const allAuthors = await author.findAll();
  let formattedAuthors = [];

  allAuthors.map((a) => {
    formattedAuthors.push(a.get({ plain: true }).name);
  });

  return formattedAuthors;
};

module.exports = getAllAuthors;
