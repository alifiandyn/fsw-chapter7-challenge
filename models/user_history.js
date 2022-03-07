const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

class User_History extends Model {}

User_History.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    win: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0,
    },
    lose: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0,
    },
    draw: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "user_history",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    freezeTableName: true,
  }
);

module.exports = User_History;
