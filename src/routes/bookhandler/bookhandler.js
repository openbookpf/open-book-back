const { Router } = require("express");
const bookhandler = Router();
const createabook = require("./controllers/createabook");
const getBookController = require("./controllers/getBookController");
const getBookByIdController = require("./controllers/getBookByIdController");

bookhandler.post("/", async (req, res) => {
  try {
    const libro = req.body;
    const newBook = await createabook(libro);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookhandler.get("/", async (req, res) => {
  try {
    const allBooks = await getBookController();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

bookhandler.get("/:id", async (req, res) => {
  const {id} = req.query;
  try {
    const book = await getBookByIdController(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = bookhandler;
