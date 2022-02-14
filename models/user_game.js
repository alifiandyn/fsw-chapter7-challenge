const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

class Users extends Model {}

Users.init(
  {
    // Model attributes are defined here
    uuid: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: "Username has been registered",
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      defaultValue: 2, //
      type: DataTypes.INTEGER,
    },
    is_active: {
      defaultValue: true, //User default activated
      type: DataTypes.BOOLEAN,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user_game", // We need to choose the model name
    freezeTableName: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = Users;
