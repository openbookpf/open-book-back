require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const userModel = require("./models/User");
const bookModel = require("./models/Book");
const orderModel = require("./models/Order");
const orderItemModel = require("./models/OrderItem");
const paymentModel = require("./models/Payment");
const reviewModel = require("./models/Review");
const genreModel = require("./models/Genre");
const authorModel = require("./models/Author");
const cartModel = require("./models/Cart");
const discountsModel = require("./models/discounts");
const editorialModel = require("./models/editorial");

const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: "postgres",
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Usar false si no tienes un certificado de CA válido
    },
  },
});

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/openbook`,
//   {
//     logging: false,
//     native: false,
//   }
// );

userModel(sequelize);
bookModel(sequelize);
orderModel(sequelize);
orderItemModel(sequelize);
paymentModel(sequelize);
reviewModel(sequelize);
genreModel(sequelize);
authorModel(sequelize);
editorialModel(sequelize);
cartModel(sequelize);
discountsModel(sequelize);

const {
  book,
  order,
  order_item,
  payment,
  review,
  user,
  editorial,
  author,
  discounts,
  cart,
  genre,
} = sequelize.models;

// One-to-many relationship (both ends) between User and Order.
user.hasMany(order, {
  foreignKey: "user_id",
});

order.belongsTo(user, {
  foreignKey: "user_id",
});

//Relación de muchos a muchos que genera tabla intermedia de favoritos.
user.belongsToMany(book, { through: "favorite_user" });
book.belongsToMany(user, { through: "favorite_user" });

// Relacion de cart hacia books de muchos a muchos
cart.belongsToMany(book, { through: "CartBook" });
book.belongsToMany(cart, { through: "CartBook" });

//Relación de uno a uno con usuario y carrito
user.hasOne(cart);
cart.belongsTo(user);

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
  foreignKey: "id_user",
});

review.belongsTo(user, {
  foreignKey: "id_user",
});

// One-to-many relationship (both ends) between Book and Review.
book.hasMany(review, {
  foreignKey: "ISBN",
});

review.belongsTo(book, {
  foreignKey: "ISBN",
});

discounts.hasMany(book, {
  foreignKey: "id_discounts",
});

book.belongsTo(discounts, {
  foreignKey: "id_discounts",
});

author.belongsToMany(book, { through: "author_books" });
book.belongsToMany(author, { through: "author_books" });

genre.belongsToMany(book, { through: "genre_books" });
book.belongsToMany(genre, { through: "genre_books" });

editorial.belongsToMany(book, { through: "editorial_books" });
book.belongsToMany(editorial, { through: "editorial_books" });

//* NOTE: These associations enable bidirectional querying between associated tables.

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
