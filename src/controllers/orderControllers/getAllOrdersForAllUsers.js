const { Sequelize, literal } = require("sequelize");
const {
  book,
  author,
  genre,
  language,
  editorial,
  review,
  user,
  order_item,
  order,
  payment,
} = require("../../db");
const getAllPaymentsAndOrdersByUserId = require("./getAllPaymentsByUserId");

const getAllOrdersForAllUsers = async () => {
  const allUsers = await user.findAll();

  const allUserOrders = Promise.all(
    allUsers.map(async (userForDetail) => {
      return {
        user_name: userForDetail.user_name,
        email_address: userForDetail.email_address,
        auth0id: userForDetail.idAuth0,
        orders: await getAllPaymentsAndOrdersByUserId(userForDetail.idAuth0),
      };
    })
  );

  return allUserOrders;
};

module.exports = getAllOrdersForAllUsers;
