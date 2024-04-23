const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // {"given_name":"Daniel Antonio",
  // "family_name":"Mas Martinez",
  // "nickname":"danielmasmar",
  // "name":"Daniel Antonio Mas Martinez",
  // "picture":"https://lh3.googleusercontent.com/a/ACg8ocLtaTWL3aFI29F-xUUdavYZfXhR1z_E8IjP7NqUXRa9J9_zYgA=s96-c",
  // "locale":"es-419",
  // "updated_at":"2024-04-22T23:14:15.541Z",
  // "email":"danielmasmar@gmail.com",
  // "email_verified":true,
  // "sub":"google-oauth2|110800474049466533407"}
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_verified: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        validate: {
          is: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,15}$/,
        },
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[0-9-+\s]+$/,
          },
        },
        allowNull: true,
      },
      adress_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adress_nro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adress_cp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      quantity_review: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      user_type: {
        type: DataTypes.STRING,
        defaultValue: "shoppeer",
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
