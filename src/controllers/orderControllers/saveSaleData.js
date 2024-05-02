const { order, order_item, payment } = require("../../db");

const createOrder = async (date, total_amount, userUserId) => {
  const newOrder = await order.create({
    userUserId,
    date,
    total_amount,
  });
  return newOrder.order_id;
};

const addOrderItems = async (quantity, subtotal, orderOrderId) => {
  const addedItems = await order_item.create({
    orderOrderId,
    quantity,
    subtotal,
  });
};

const savePaymentData = async () => {};

const saveSaleData = async (cart, payment) => {};

module.exports = saveSaleData;
