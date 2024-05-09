const { Router } = require("express");
const orderRoutes = Router();
const emailNotification = require("../controllers/orderControllers/emailNotification");
const getAllPaymentsAndOrders = require("../controllers/orderControllers/getAllPayments");
const getAllPaymentsAndOrdersByUserId = require("../controllers/orderControllers/getAllPaymentsByUserId");
const {
  saveSaleData,
} = require("../controllers/orderControllers/saveSaleData");

//controllers
const {
  createOrder,
  captureOrder,
} = require("../controllers/orderControllers/paypal-api");

//Routes
orderRoutes.post("/", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart, totalValue } = req.body;
    console.log(cart);
    console.log(totalValue);
    const { jsonResponse, httpStatusCode } = await createOrder(
      cart,
      totalValue
    );
    console.log(jsonResponse.id);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

orderRoutes.get("/payments-and-orders", async (req, res) => {
  try {
    let allPayments;
    const { idAuth0 } = req.query;

    if (!idAuth0) {
      allPayments = await getAllPaymentsAndOrders();
    } else {
      allPayments = await getAllPaymentsAndOrdersByUserId(idAuth0);
    }

    res.status(200).send(allPayments);
  } catch (error) {
    console.error("Failed to obtain payments' details:", error);
    res.status(500).json({ error: "Failed to obtain payments' details." });
  }
});

orderRoutes.post("/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { name, emailAddress, totalValue, idAuthZero, cart } = req.body;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);

    //Send email notification
    emailNotification(name, emailAddress, orderID, totalValue.toFixed(2));

    console.log(jsonResponse);

    //Save purchase date into the database
    saveSaleData(idAuthZero, cart, jsonResponse, totalValue);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = orderRoutes;
