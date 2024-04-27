const datos = require("./datos");
const dataAuthors = require("./dataAuthors");
const dataGenres = require("./dataGenres");
const createBook = require("./../controllers/booksControllers/createBook");
const createAuthor = require("../controllers/authorControllers/createAuthor");
const createGenre = require("../controllers/genreControllers/createGenre");
module.exports = async () => {
  const authors = await Promise.all(
    dataAuthors.map(async (author) => {
      await createAuthor(author.name, author.description);
    })
  );

  const genres = await Promise.all(
    dataGenres.map(async (genre) => {
      await createGenre(genre.name);
    })
  );

  const books = await Promise.all(
    datos.map(async (book, index) => {
      // console.log(index);
      await createBook(book);
    })
  );

  console.log("Datos de la API externa guardados en la base de datos.");
};
