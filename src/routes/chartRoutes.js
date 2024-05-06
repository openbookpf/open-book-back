const { Router } = require("express");
const chartRoutes = Router();
const salesDetails = require("../controllers/orderControllers/salesDetails");

//Get all generes
chartRoutes.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let getSales;

    if (name === "sales") {
      getSales = await salesDetails();
    }

    res.status(200).json(getSales);
  } catch (error) {
    console.error("Failed to get details:", error);
    res.status(500).json({ error: "Failed to get details." });
  }
});

module.exports = chartRoutes;
