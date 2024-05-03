const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.5,
          max: 5.0,
        },
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
