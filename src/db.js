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
const discountsModel = require("./models/Discounts");
const editorialModel = require("./models/Editorial");
const languageModel = require("./models/Language");
const favoriteModel = require("./models/Favorite");

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
languageModel(sequelize);
favoriteModel(sequelize);

const {
  book,
  order,
  language,
  order_item,
  payment,
  review,
  user,
  editorial,
  author,
  discounts,
  cart,
  genre,
  favorite,
} = sequelize.models;

// Relación de User a Order (1 a muchos)
user.hasMany(order);
order.belongsTo(user);

// Relacion de User a Favorite
user.hasMany(favorite);
favorite.belongsTo(user);

// Relación de User a Cart (1 a 1)
user.hasOne(cart);
cart.belongsTo(user);

// Relación de User a Review (1 a muchos)
user.hasMany(review);
review.belongsTo(user);

// Relación de Book a Review (1 a muchos)
book.hasMany(review);
review.belongsTo(book);

// Relación de User a Book (muchos a muchos)
user.belongsToMany(book, { through: "favorites_user" });
book.belongsToMany(user, { through: "favorites_user" });

// Relacion de order a order_item de 1 a muchos
order.hasMany(order_item);
order_item.belongsTo(order);

// Relación de Order a Payment (1 a 1)
order.hasOne(payment);
payment.belongsTo(order);

// Relación de Cart a Book (muchos a muchos)
cart.belongsToMany(book, { through: "cartBook" });
book.belongsToMany(cart, { through: "cartBook" });

// Relación de Discounts a Book (uno a uno)
discounts.hasOne(book);
book.belongsTo(discounts);

// Relación de Author a Book (1 a muchos)
author.hasMany(book);
book.belongsTo(author);

// Relación de Genre a Book (muchos a muchos)
genre.belongsToMany(book, {
  through: { model: "bookGenre", timestamps: false },
});
book.belongsToMany(genre, {
  through: { model: "bookGenre", timestamps: false },
});

// Relación de Editorial a Book (1 a muchos)
editorial.hasMany(book);
book.belongsTo(editorial);

// Relación de Language a Book (1 a muchos)
language.hasMany(book);
book.belongsTo(language);

// One-to-many relationship (both ends) between Book and Order_item.
book.hasMany(order_item);

order_item.belongsTo(book);

module.exports = {
  ...sequelize.models,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
