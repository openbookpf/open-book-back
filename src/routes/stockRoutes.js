const { Router } = require("express");
const stockRoutes = Router();
const createStock = require("../controllers/stockControllers/createStock");
const getAllStocks = require("../controllers/stockControllers/getAllStocks");

stockRoutes.post("/", async (req, res) => {
  try {
    const { quantity, ISBN } = req.body;
    const newStock = await createStock({ quantity, ISBN });
    res.status(200).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

stockRoutes.get("/", async (req, res) => {
  try {
    const allStocks = await getAllStocks();
    res.status(200).json(allStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = stockRoutes;
