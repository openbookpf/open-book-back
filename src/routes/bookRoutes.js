const { Router } = require("express");
const bookRoutes = Router();
//validators
const createBookSchema = require("../schemas/createBookSchema");
const createBookValidation = require("../middleware/createBookValidation");
//controllers
const getAllBooksController = require("../controllers/booksControllers/getAllBooksController");
const getBookByIdController = require("../controllers/booksControllers/getBookByIdController");
const getBookByNameController = require("../controllers/booksControllers/getBookByNameController");
const filterByGenre = require("../controllers/booksControllers/filterByGenre");
const filterByAuthor = require("../controllers/booksControllers/filterByAuthor");
const orderBooksByPrice = require("../controllers/booksControllers/orderBooksByPrice");
const modifyBook = require("../controllers/booksControllers/modifyBookController");
const uploadImage = require("../controllers/booksControllers/uploadImage");
const createBookFrontEnd = require("../controllers/booksControllers/createBookFrontEnd");
// const deleteBook = require("../controllers/booksControllers/deleteBook");

//* GET ALL BOOKS AND QUERY BOOKS BY NAME
bookRoutes.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const foundBooks = await getBookByNameController(name);
      res.status(200).json(foundBooks);
    } else {
      const allBooks = await getAllBooksController();
      res.status(200).json(allBooks);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//* GET BOOK BY ID
bookRoutes.get("/bookId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundBook = await getBookByIdController(id);
    res.status(200).json(foundBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//* FILTER BY GENRE
bookRoutes.get("/filtrar-genre", async (req, res) => {
  const { genre } = req.query;
  try {
    const filteredBooks = genre
      ? await filterByGenre(genre)
      : await getBookController();
    res.status(200).json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* FILTER BY AUTHOR'S NAME
bookRoutes.get("/filtrar-autor", async (req, res) => {
  const { author } = req.query;
  try {
    const bookbyautores = author
      ? await filterByAuthor(author)
      : await getBookController();
    res.status(200).json(bookbyautores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* ORDER BY PRICE
bookRoutes.get("/order-by-price/:order", async (req, res) => {
  const { order } = req.params;
  try {
    const nuevoorden = await orderBooksByPrice(order);
    res.status(200).json(nuevoorden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* MODIFY BOOK DATA
bookRoutes.put("/bookId/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const settingbook = await modifyBook(id, newData);
    if (settingbook) {
      res.status(200).send({
        message: `the data for the book with ISBN = ${id} has been modified`,
      });
    } else {
      res.send.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* CREATE A BOOK
bookRoutes.post(
  "/",

  uploadImage,
  createBookValidation(createBookSchema),
  async (req, res) => {
    try {
      const { ISBN, book_title, author, genre, book_description, price } =
        req.body;

      console.log(req.file.path);
      const book_cover_url = req.file.path;
      const newBook = await createBookFrontEnd({
        ISBN,
        book_title,
        author,
        genre,
        book_description,
        price,
        book_cover_url,
      });
      res.status(200).json(newBook);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
);

//? DEBERIAMOS MANTENER ESTA RUTA DE IGUAL FORMA? Se puede utilizar la de modify books y ya
// bookRoutes.delete("/deletebook/:ISBN", async (req, res) => {
//   const { ISBN } = req.params;

//   try {
//     const borrar = await deleteBook(ISBN);
//     if (borrar) {
//       res.status(200).send({
//         message: `Libro con ISBN ${ISBN} ha sido eliminado correctamente.`,
//       });
//     } else {
//       res
//         .status(404)
//         .send({ message: `No se encontró ningún libro con ISBN ${ISBN}.` });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//* GET ALL BOOKS AND QUERY BOOKS BY NAME
bookRoutes.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const foundBooks = await getBookByNameController(name);
      res.status(200).json(foundBooks);
    } else {
      const allBooks = await getBookController();
      res.status(200).json(allBooks);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = bookRoutes;
