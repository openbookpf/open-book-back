const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      nro_document: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          len: [1, 20],
          isAlphanumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[0-9\-\+\s]+$/,
          },
        },
      },
      password: {
        type: DataTypes.STRING(),
        validate: {
          is: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,15}$/,
        },
        allowNull: false,
      },
      adress_street: {
        type: DataTypes.STRING,
      },
      adress_nro: {
        type: DataTypes.STRING,
      },
      adress_cp: {
        type: DataTypes.STRING,
      },
      brithdate: {
        type: DataTypes.DATEONLY,
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      quantity_review: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_type: {
        type: DataTypes.ENUM('shoppeer', 'trader', 'admin'),
        defaultValue: "shoppeer",
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
