const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      user_type: {
        type: DataTypes.STRING,
        defaultValue: "store_customer",
        allowNull: true,
      },
      user_status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
