const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      idAuth0: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[0-9\-\+\s]+$/,
          },
        },
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(),
        validate: {
          is: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,15}$/,
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
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_type: {
        type: DataTypes.ENUM("shopper", "trader", "admin"),
        defaultValue: "shopper",
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};

// nro_document: {
//   type: DataTypes.STRING,
//   primaryKey: true,
//   validate: {
//     len: [1, 20],
//     isAlphanumeric: true,
//   },
//   allowNull: true,
// },
