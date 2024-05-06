const {
  savePaymentData,
  addOrderItems,
  createOrder,
} = require("../controllers/orderControllers/saveSaleData");
const datos = require("./datos");
function getRandomDate() {
  // Generate a random year between 2023 and 2024
  const year = Math.floor(Math.random() * 2) + 2023;

  // Generate a random month between 1 and 12
  let maxMonth = 12;
  if (year === 2024) {
    maxMonth = 5; // If the year is 2024, limit the month to May
  }
  const month = Math.floor(Math.random() * maxMonth) + 1;

  // Generate a random day based on the month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;

  // Format the date as dd/mm/yyyy
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
}

const createMockCart = async (numberOfItems) => {
  const mockCart = datos.slice(0, numberOfItems).map((book) => {
    const quantity = Math.floor(Math.random() * 5) + 1;
    return {
      ISBN: book.ISBN,
      quantity: Number(quantity),
      subtotal: Number(quantity * book.price),
    };
  });

  return mockCart;
};

const createMockSalesData = async (userId) => {
  let total_amount = 0;
  const date = getRandomDate();
  const mockCart = await createMockCart(
    Math.floor(Math.random() * datos.length) + 1
  );
  mockCart.forEach((item) => {
    total_amount += item.subtotal;
  });

  // Round total_amount to two decimal places
  total_amount = total_amount.toFixed(2);

  const order_id = await createOrder(date, total_amount, userId);

  Promise.all(
    mockCart.map((item) => {
      return addOrderItems(
        item.quantity,
        item.subtotal.toFixed(2),
        order_id,
        item.ISBN
      );
    })
  );

  const mockPaymentID = `MOCK${date}$TEST${
    Math.floor(Math.random() * 1000) + 1
  }`;

  savePaymentData(mockPaymentID, date, total_amount, order_id);
};

module.exports = createMockSalesData;
