const { Router } = require("express");
const stockHandler = Router();
const createaStock = require("./controllers/createaStock");
const getAllStocks = require("./controllers/getAllStocks");
stockHandler.post("/", async (req, res) => {
  try {
    const { quantity, ISBN } = req.body;
    const newStock = await createaStock({ quantity, ISBN });
    res.status(200).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

stockHandler.get("/", async (req, res) => {
  try {
    const allStocks = await getAllStocks();
    res.status(200).json(allStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = stockHandler;
