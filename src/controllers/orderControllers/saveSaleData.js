const { order, order_item, payment, user } = require("../../db");
const getTodaysDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};
const createOrder = async (date, total_amount, userUserId) => {
  const newOrder = await order.create({
    userUserId,
    date,
    total_amount,
  });
  return newOrder.order_id;
};

const addOrderItems = async (quantity, subtotal, orderOrderId, bookISBN) => {
  const addedItems = await order_item.create({
    orderOrderId,
    quantity,
    subtotal,
    bookISBN,
  });
};

const savePaymentData = async (id_payment, date, amount, orderOrderId) => {
  const savedPayment = await payment.create({
    id_payment,
    date,
    amount,
    orderOrderId,
  });
};

const saveSaleData = async (userId, cart, payment, totalValue) => {
  const foundUser = await user.findOne({
    where: {
      idAuth0: userId,
    },
  });
  const total_amount = totalValue;

  const date = getTodaysDate();
  const order_id = await createOrder(date, total_amount, foundUser.user_id);
  const id_payment = payment.id;
  Promise.all(
    cart.map((item) => {
      const subtotal = (item.quantity * item.price).toFixed(2);
      addOrderItems(item.quantity, subtotal, order_id, item.ISBN);
    })
  );
  savePaymentData(id_payment, date, total_amount, order_id);
};

module.exports = { saveSaleData, savePaymentData, addOrderItems, createOrder };
