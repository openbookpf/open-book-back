const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "favorite",
    {
      fav_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      book_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      book_picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(2000),
        validate: {
          len: [1, 2000],
        },
      },
    },
    { timestamps: false }
  );
};
