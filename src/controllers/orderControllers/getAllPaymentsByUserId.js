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

const getAllPaymentsAndOrdersByUserId = async (idAuth0) => {
  let foundUser;
  if (idAuth0) {
    foundUser = await user.findOne({
      where: { idAuth0: idAuth0 },
    });
  } else {
    throw new Error("User not Found");
  }

  const allPayments = await order.findAll({
    attributes: ["order_id", "date", "total_amount"],
    where: {
      userUserId: foundUser.user_id,
    },

    include: {
      model: order_item,
      attributes: ["quantity", "subtotal"],
      include: {
        model: book,
        attributes: ["ISBN", "book_title"],
        // include: {
        //   model: genre,
        //   attributes: ["name"],
        //   through: { attributes: [] },
        // },
      },
    },
  });

  return allPayments;
};

module.exports = getAllPaymentsAndOrdersByUserId;
