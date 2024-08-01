const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cat extends Model {}

Cat.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    isCute: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = Cat;
