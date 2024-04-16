const { book } = require("../../db");

const orderBooksByPrice = async (order) => {
  if (!order) {
    throw new Error("You must provide a order");
  }  const allbooks = await book.findAll();
  if (order == "ASC") {
    const neworder = allbooks.sort((a, b) => a.price - b.price);
  return neworder;
  } if(order == "DESC") {
    const neworder = allbooks.sort((a, b) => b.price - a.price);
   return neworder;
  }
  else{
    throw new Error("the value to be sorted is invalid");
  }
};

module.exports = orderBooksByPrice;
