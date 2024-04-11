require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const userModel = require("./models/User");
const bookModel = require("./models/Book");
const orderModel = require("./models/Order");
const orderItemModel = require("./models/OrderItem");
const paymentModel = require("./models/Payment");
const stockModel = require("./models/Stock");
const reviewModel = require("./models/Review");
// const genreModel = require("./models/Genre");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/openbook`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

userModel(sequelize);
bookModel(sequelize);
orderModel(sequelize);
orderItemModel(sequelize);
paymentModel(sequelize);
stockModel(sequelize);
reviewModel(sequelize);
// genreModel(sequelize);

const { book, order, order_item, payment, review, stock, user } =
  sequelize.models;

// One-to-many relationship (both ends) between User and Order.
user.hasMany(order, {
  foreignKey: "user_id",
});

order.belongsTo(user, {
  foreignKey: "user_id",
});

// One-to-many relationship (both ends) between Book and Genre.
// book.hasMany(genre, {
//   foreignKey: "ISBN",
// });

// genre.belongsTo(book, {
//   foreignKey: "ISBN",
// });

// One-to-many relationship (both ends) between Order and Order_Item.
order.hasMany(order_item, {
  foreignKey: "order_id",
});

order_item.belongsTo(order, {
  foreignKey: "order_id",
});

// One-to-one relationship (both ends) between Order and Payment.
order.hasOne(payment, {
  foreignKey: "order_id",
});

payment.belongsTo(order, {
  foreignKey: "order_id",
});

// One-to-many relationship (both ends) between Book and Order_item.
book.hasMany(order_item, {
  foreignKey: "ISBN",
});

order_item.belongsTo(book, {
  foreignKey: "ISBN",
});

// One-to-many relationship (both ends) between User and Review.
user.hasMany(review, {
  foreignKey: "user_id",
});

review.belongsTo(user, {
  foreignKey: "user_id",
});

// One-to-many relationship (both ends) between Book and Review.
book.hasMany(review, {
  foreignKey: "ISBN",
});

review.belongsTo(book, {
  foreignKey: "ISBN",
});

// One-to-one relationship (both ends) between Book and Stock.
book.hasOne(stock, {
  foreignKey: "ISBN",
});

stock.belongsTo(book, {
  foreignKey: "ISBN",
});

//* NOTE: These associations enable bidirectional querying between associated tables.

//TODO: Revisar y reestructurar modelos en base a los tipos de datos que vamos a guardar

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
