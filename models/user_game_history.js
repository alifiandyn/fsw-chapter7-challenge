const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

class UserGameHistory extends Model {}

UserGameHistory.init(
  {
    // Model attributes are defined here
    uuid: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_game_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    playerChoose: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    comChoose: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user_game_history", // We need to choose the model name
    freezeTableName: true,
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = UserGameHistory;
