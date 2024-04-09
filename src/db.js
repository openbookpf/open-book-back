require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

console.log(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/openbook`);

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/openbook`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//destructuring of all models
const { Book, Order, Order_item, Payment, Review, Stock, User } =
  sequelize.models;

// Declaring Relationships

// One-to-many relationship (both ends) between User and Order.
User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

// One-to-many relationship (both ends) between Order and Order_Item.
Order.hasMany(Order_item, {
  foreignKey: "order_id",
});

Order_item.belongsTo(Order, {
  foreignKey: "order_id",
});

// One-to-one relationship (both ends) between Order and Payment.
Order.hasOne(Payment, {
  foreignKey: "order_id",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
});

// One-to-many relationship (both ends) between Book and Order_item.
Book.hasMany(Order_item, {
  foreignKey: "ISBN",
});

Order_item.belongsTo(Book, {
  foreignKey: "ISBN",
});

// One-to-many relationship (both ends) between User and Review.
User.hasMany(Review, {
  foreignKey: "user_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

// One-to-many relationship (both ends) between Book and Review.
Book.hasMany(Review, {
  foreignKey: "ISBN",
});

Review.belongsTo(Book, {
  foreignKey: "ISBN",
});

// One-to-one relationship (both ends) between Book and Stock.
Book.hasOne(Stock, {
  foreignKey: "ISBN",
});

Stock.belongsTo(Book, {
  foreignKey: "ISBN",
});

//* NOTE: These associations enable bidirectional querying between associated tables.

//TODO: Revisar y reestructurar modelos en base a los tipos de datos que vamos a guardar

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
