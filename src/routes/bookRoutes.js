const { Router } = require("express");
const bookRoutes = Router();
const createBook = require("../controllers/booksControllers/createBook");
const getBookController = require("../controllers/booksControllers/getBookController");
const getBookByIdController = require("../controllers/booksControllers/getBookByIdController");
const getBookByNameController = require("../controllers/booksControllers/getBookByNameController");
const filterGenre = require("../controllers/booksControllers/filterByGenre");
const filterAuthor = require("../controllers/booksControllers/filterByAuthor");
const orderByPrice = require("../controllers/booksControllers/orderByPrice");
const deleteBook = require("../controllers/booksControllers/deleteBook");
const modifyBook = require("../controllers/booksControllers/modifyBooks");
bookRoutes.post("/", async (req, res) => {
  try {
    const libro = req.body;
    const newBook = await createBook(libro);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookRoutes.delete("/deletebook/:ISBN", async (req, res) => {
  const { ISBN } = req.params;
  // console.log(ISBN);
  try {
    const borrar = await deleteBook(ISBN);
    if (borrar) {
      res.send(`Libro con ISBN ${ISBN} ha sido eliminado correctamente.`);
    } else {
      res.status(404).send(`No se encontró ningún libro con ISBN ${ISBN}.`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

bookRoutes.get("/filtrargenero", async (req, res) => {
  const { genre } = req.query;
  try {
    const filterbygenre = genre
      ? await filterGenre(genre)
      : await getBookController();
    res.status(200).json(filterbygenre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

bookRoutes.get("/filtrarautor", async (req, res) => {
  const { author } = req.query;
  try {
    const bookbyautores = author
      ? await filterAuthor(author)
      : await getBookController();
    res.status(200).json(bookbyautores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

bookRoutes.get("/orderbyprice", async (req, res) => {
  try {
    const nuevoorden = await orderByPrice();
    res.status(200).json(nuevoorden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

bookRoutes.put("/modifybook", async (req, res) => {
  const { ISBN } = req.query;
  const newbody = req.body;
  try {
    const settingbook = await modifyBook(ISBN, newbody);
    if (settingbook) {
      res.send(`this book with ISBN = ${ISBN} has recently change`);
    } else {
      res.send("not found any book");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

bookRoutes.get("/:id", async (req, res) => {
  const { id } = req.query;
  try {
    const book = await getBookByIdController(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = bookRoutes;
