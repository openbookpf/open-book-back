const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "book",
    {
      ISBN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
          isNumeric: true,
          len: [1, 13],
        },
      },
      book_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      book_cover_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: {
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      book_description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        validate: {
          len: [1, 2000],
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {},
          min: {
            args: [0],
          },
          max: {
            args: [999999],
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
          },
          max: {
            args: [1000],
          },
        },
      },
      average_mark: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 10,
        },
      },
      book_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate: {
          isBoolean: "The data must be true or false",
        },
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      year_of_edition: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1700, 
          max: new Date().getFullYear()
        },
      },
      age_segment: {
        type: DataTypes.ENUM('Infantil', 'Juvenil', 'Adulto'),
      }
    },
    { timestamps: false }
  );
};
