const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

class UserGameBiodata extends Model {}

UserGameBiodata.init(
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
    fullname: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user_game_biodata", // We need to choose the model name
    freezeTableName: true,
    createdAt: false,
    updatedAt: true,
  }
);

module.exports = UserGameBiodata;
