const { Router } = require("express");
const bookHandler = Router();
const createaBook = require("./controllers/createaBook");
const getBookController = require("./controllers/getBookController");
const getBookByIdController = require("./controllers/getBookByIdController");

bookHandler.post("/", async (req, res) => {
  try {
    const libro = req.body;
    const newBook = await createaBook(libro);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookHandler.get("/", async (req, res) => {
  try {
    const allBooks = await getBookController();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookHandler.get("/:id", async (req, res) => {
  const {id} = req.query;
  try {
    const book = await getBookByIdController(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = bookHandler;
