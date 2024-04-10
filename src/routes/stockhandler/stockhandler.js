const { Router } = require("express");

const stockhandler = Router();
const createastock = require("./controllers/createastock");
const getallstocks = require("./controllers/getallstocks");
stockhandler.post("/", async (req, res) => {
  try {
    const { quantity, ISBN } = req.body;
    const newStock = await createastock({ quantity, ISBN });
    res.status(200).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
stockhandler.get("/", async (req, res) => {
  try {
    const allstocks = await getallstocks();
    res.status(200).json(allstocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = stockhandler;
