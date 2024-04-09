const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "book",
    {
      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      book_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      book_cover_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      book_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
