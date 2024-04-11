const { Router } = require("express");
const bookRoutes = Router();
const createBook = require("../controllers/booksControllers/createBook");
const getBookController = require("../controllers/booksControllers/getBookController");
const getBookByIdController = require("../controllers/booksControllers/getBookByIdController");

bookRoutes.post("/", async (req, res) => {
  try {
    const libro = req.body;
    const newBook = await createBook(libro);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookRoutes.get("/", async (req, res) => {
  try {
    const allBooks = await getBookController();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookRoutes.get("/:id", async (req, res) => {
  const {id} = req.query;
  try {
    const book = await getBookByIdController(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = bookRoutes;
