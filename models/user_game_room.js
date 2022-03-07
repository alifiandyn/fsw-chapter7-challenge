const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

class UserGameRoom extends Model {}

UserGameRoom.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    room_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: "Room Name Is Already Used",
      },
    },
    owned_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    player_1_choices: {
      type: DataTypes.ARRAY(DataTypes.ENUM("ROCK", "PAPER", "SCISSOR")),
    },
    player_1_uuid: {
      type: DataTypes.UUID,
    },
    player_2_choices: {
      type: DataTypes.ARRAY(DataTypes.ENUM("ROCK", "PAPER", "SCISSOR")),
    },
    player_2_uuid: {
      type: DataTypes.UUID,
    },
    winner_uuid: {
      type: DataTypes.UUID,
    },
    loser_uuid: {
      type: DataTypes.UUID,
    },
    draw: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user_game_room", // We need to choose the model name
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    freezeTableName: true,
  }
);

UserGameRoom.beforeCreate((room) => {
  room.room_name = room.room_name.toLowerCase();
});

UserGameRoom.beforeUpdate((room) => {
  room.room_name = room.room_name.toLowerCase();
});

module.exports = UserGameRoom;
