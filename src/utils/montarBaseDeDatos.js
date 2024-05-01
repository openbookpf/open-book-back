const datos = require("./datos");
const dataAuthors = require("./dataAuthors");
const dataGenres = require("./dataGenres");
const createBook = require("./../controllers/booksControllers/createBook");
const createAuthor = require("../controllers/authorControllers/createAuthor");
const createGenre = require("../controllers/genreControllers/createGenre");
const {
  getAllUsersFromAuthZero,
} = require("../controllers/userControllers/authZeroApi");
const createUser = require("../controllers/userControllers/createUser");
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

  const users = await getAllUsersFromAuthZero();

const createdUsers = await Promise.all(
   users.map((user) => {
     const { name, email, picture, user_id } = user;
     const data = {
       user_name: name,
      email_address: email,
       password: "",
      picture: picture,
     idAuth0: user_id,
    };

     createUser(data);
  })
 );

  console.log("Datos de la API externa guardados en la base de datos.");
};
