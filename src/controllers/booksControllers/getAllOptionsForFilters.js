const { book } = require("../../db");

const getAllOptionsForFilters = async () => {
  const resultobj = {};
  const allbooks = await book.findAll();
  const allgenres = new Set(
    allbooks.map((book) => {
      return book.genre;
    })
  );
  const allauthors = new Set(
    allbooks.map((book) => {
      return book.author;
    })
  );
  resultobj.genres = Array.from(allgenres);
  resultobj.authors = Array.from(allauthors);

  return resultobj;
};

module.exports = getAllOptionsForFilters;
