const { Router } = require("express");
const orderRoutes = Router();
const emailNotification = require("../controllers/orderControllers/emailNotification");

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

orderRoutes.post("/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { name, emailAddress, totalValue } = req.body;

    console.log(name);
    console.log(emailAddress);
    console.log(totalValue);

    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    res.status(httpStatusCode).json(jsonResponse);
    emailNotification(name, emailAddress, orderID, totalValue);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = orderRoutes;
